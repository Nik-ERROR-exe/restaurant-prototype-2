import { useEffect, useRef, useState, useCallback } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION — Adjust these constants to swap animation sequences.
 * ═══════════════════════════════════════════════════════════════════════════ */

/** Path to the frames directory relative to `public/` (no leading slash needed at build time). */
const FRAME_FOLDER = "/frames/hero-sequence";
/** File name pattern — {INDEX} is replaced with the zero-padded frame number. */
const FRAME_PATTERN = "ezgif-frame-{INDEX}.jpg";
/** Number of digits for zero-padding (e.g. 3 → 001, 002, ... 240). */
const PAD_DIGITS = 3;
/** First frame number in the sequence. */
const FRAME_START = 1;
/** Last frame number in the sequence (inclusive). */
const FRAME_END = 240;
/** Total frame count (derived). */
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1;

/**
 * How many viewport-heights of scroll distance the pinned sequence occupies.
 * Desktop: 3× viewport height gives a comfortable pace.
 * Mobile:  2× feels better for faster touch gestures.
 */
const SCROLL_DISTANCE_VH_DESKTOP = 3;
const SCROLL_DISTANCE_VH_MOBILE = 2;
/** Breakpoint (px) below which we use mobile scroll distance. */
const MOBILE_BREAKPOINT = 768;

/**
 * GSAP scrub value — `true` = instant, small number = slight smoothing.
 * 0.5 gives a subtle lag that feels "cinematic" without disconnecting from input.
 */
const SCRUB_AMOUNT = 0.5;

/*
 * NOTE: With 240 frames at ~15–100 KB each, total payload is ≈5 MB.
 * For production, consider:
 *   - Converting frames to WebP for ~40% size reduction
 *   - Lazy-loading in chunks (e.g., first 60 immediately, rest on idle)
 *   - Using a CDN with aggressive caching
 */

/*
 * IDEAL SOURCE FRAME RESOLUTION:
 * Keep source images no larger than ~1920px on their longest edge.
 * Oversized source frames (e.g. 4K originals) drastically increase per-frame
 * drawImage() cost because the browser must down-scale every time, even when
 * using pre-decoded ImageBitmaps. Resizing sources offline to ≤1920px keeps
 * draw times well under a single frame budget at 60 fps.
 */

/* ═══════════════════════════════════════════════════════════════════════════
 * HELPERS
 * ═══════════════════════════════════════════════════════════════════════════ */

function padIndex(num: number): string {
  return String(num).padStart(PAD_DIGITS, "0");
}

function frameSrc(index: number): string {
  return `${FRAME_FOLDER}/${FRAME_PATTERN.replace("{INDEX}", padIndex(index))}`;
}

/**
 * Draws `img` onto `ctx` with "object-fit: cover" behavior:
 * scales + center-crops to fill the canvas without distortion.
 *
 * Accepts both HTMLImageElement and ImageBitmap sources. ImageBitmap uses
 * `.width` / `.height` instead of `.naturalWidth` / `.naturalHeight`.
 */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: ImageBitmap | HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img instanceof ImageBitmap ? img.width : img.naturalWidth;
  const ih = img instanceof ImageBitmap ? img.height : img.naturalHeight;
  if (!iw || !ih) return;

  const canvasRatio = cw / ch;
  const imgRatio = iw / ih;

  let sw: number, sh: number, sx: number, sy: number;
  if (imgRatio > canvasRatio) {
    // Image is wider — crop sides
    sh = ih;
    sw = ih * canvasRatio;
    sx = (iw - sw) / 2;
    sy = 0;
  } else {
    // Image is taller — crop top/bottom
    sw = iw;
    sh = iw / canvasRatio;
    sx = 0;
    sy = (ih - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/* ═══════════════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════ */

export function ScrollSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * Stores pre-decoded ImageBitmaps. Using createImageBitmap() during preload
   * moves JPEG/PNG decoding off the main thread and produces GPU-ready
   * textures, eliminating repeated decode cost on every drawImage() call.
   */
  const framesRef = useRef<(ImageBitmap | null)[]>([]);

  /**
   * targetFrameRef  — written ONLY by ScrollTrigger's onUpdate callback.
   * lastDrawnRef    — written ONLY by the persistent rAF render loop.
   *
   * This decoupling ensures fast/large scrolls simply overwrite targetFrameRef
   * with the final destination frame; the render loop picks it up on the next
   * tick and draws exactly once, skipping all intermediate frames.
   */
  const targetFrameRef = useRef(0);
  const lastDrawnRef = useRef(-1); // -1 so the first tick always draws

  /** Handle for the persistent rAF loop, cancelled on unmount. */
  const loopRafRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* ── Preload all frames as ImageBitmaps ──────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const bitmaps: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const frameNum = FRAME_START + i;
      return (async () => {
        try {
          const response = await fetch(frameSrc(frameNum));
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          bitmaps[i] = bitmap;
        } catch (err) {
          console.warn(`[ScrollSequence] Failed to load frame ${frameNum}:`, err);
          bitmaps[i] = null; // skip this frame gracefully
        } finally {
          loadedCount++;
          if (!cancelled) {
            setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          }
        }
      })();
    });

    Promise.all(promises).then(() => {
      if (!cancelled) {
        framesRef.current = bitmaps;
        setLoaded(true);
      }
    });

    return () => {
      cancelled = true;
      // Close any bitmaps that were created to free GPU memory
      bitmaps.forEach((b) => b?.close());
    };
  }, []);

  /* ── Canvas sizing (retina-aware) ─────────────────────────────────────── */
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  /**
   * Draws a single frame onto the canvas. Called ONLY from the rAF loop
   * and from resize handling — never directly from ScrollTrigger's onUpdate.
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      ctx.clearRect(0, 0, cw, ch);

      // Clamp index
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      const bitmap = framesRef.current[clampedIndex];
      if (bitmap) {
        drawCover(ctx, bitmap, cw, ch);
      }
    },
    [],
  );

  /* ── Persistent rAF render loop ──────────────────────────────────────── */
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    sizeCanvas();
    drawFrame(0);
    targetFrameRef.current = 0;
    lastDrawnRef.current = 0;

    /**
     * Persistent render loop: runs every animation frame and draws ONLY when
     * the target frame has changed since the last draw. Fast scrolls that
     * update targetFrameRef multiple times between ticks simply cause the
     * loop to jump straight to the latest frame — no intermediate frames
     * are rendered.
     */
    const tick = () => {
      const target = targetFrameRef.current;
      if (target !== lastDrawnRef.current) {
        drawFrame(target);
        lastDrawnRef.current = target;
      }
      loopRafRef.current = requestAnimationFrame(tick);
    };
    loopRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(loopRafRef.current);
    };
  }, [loaded, sizeCanvas, drawFrame]);

  /* ── GSAP ScrollTrigger — initialized only after preload ──────────────── */
  useEffect(() => {
    if (!loaded) return;

    let scrollTriggerInstance: ScrollTrigger | null = null;

    // Dynamic import so GSAP/ScrollTrigger isn't loaded until needed
    // and avoids SSR issues with TanStack Start.
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const scrollVH = isMobile ? SCROLL_DISTANCE_VH_MOBILE : SCROLL_DISTANCE_VH_DESKTOP;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: `+=${scrollVH * 100}vh`,
        pin: true,
        scrub: SCRUB_AMOUNT,
        anticipatePin: 1,
        onUpdate: (self) => {
          // ONLY update the target frame — the persistent rAF loop handles drawing.
          const progress = self.progress; // 0 → 1
          const frameIndex = Math.round(progress * (TOTAL_FRAMES - 1));
          targetFrameRef.current = frameIndex;
        },
      });

      // Resize handler (debounced)
      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          sizeCanvas();
          // Force a redraw at the current target after resize re-scales the canvas
          lastDrawnRef.current = -1;
          ScrollTrigger.refresh();
        }, 150);
      };
      window.addEventListener("resize", onResize);

      // Store cleanup ref
      (wrapper as any).__scrollSequenceCleanup = () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeTimer);
      };
    };

    init();

    return () => {
      const wrapper = wrapperRef.current;
      if (wrapper && (wrapper as any).__scrollSequenceCleanup) {
        (wrapper as any).__scrollSequenceCleanup();
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [loaded, sizeCanvas]);

  return (
    <div
      ref={wrapperRef}
      className="scroll-sequence"
      style={{ position: "relative", width: "100%", height: "100svh", overflow: "hidden" }}
    >
      {/* Canvas — always mounted, hidden behind loader until ready */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "#c8cbce", // matches the neutral grey of the frame images
        }}
      />

      {/* Dark vignette overlay on top of canvas — ties the light frame BG into the dark site */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 65% at center 45%, transparent 30%, rgba(13,13,13,0.55) 80%, rgba(13,13,13,0.85) 100%)",
        }}
      />

      {/* Bottom fade to dark — seamless transition into next section */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "25%",
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, var(--ink))",
        }}
      />

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.7,
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        >
          Scroll to reveal
        </span>
      </div>

      {/* Loading overlay — fades out once preloading completes */}
      <div
        className="scroll-sequence__loader"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#c8cbce",
          zIndex: 20,
          opacity: loaded ? 0 : 1,
          pointerEvents: loaded ? "none" : "auto",
          transition: "opacity 0.8s ease-out",
        }}
      >
        {/* Spinner ring */}
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "2px solid rgba(212,175,55,0.2)",
            borderTopColor: "var(--gold)",
            borderRadius: "50%",
            animation: "scrollSeqSpin 0.9s linear infinite",
          }}
        />
        {/* Progress text */}
        <span
          style={{
            marginTop: "1rem",
            fontFamily: "var(--font-display)",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {loadProgress}%
        </span>
      </div>

      {/* Inline keyframes for spinner */}
      <style>{`
        @keyframes scrollSeqSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
