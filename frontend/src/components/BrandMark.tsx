import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Swappable brand heading — change BRAND.name in src/lib/brand.ts to rename
 * the restaurant everywhere in the site.
 */
export function BrandMark({
  className,
  showTagline = false,
  size = "md",
}: {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl md:text-8xl",
  };
  return (
    <div className={cn("flex flex-col items-center gap-1 leading-none", className)}>
      <span className="eyebrow text-[10px] md:text-xs">Est. Royal Kitchens</span>
      <span
        className={cn(
          "font-display text-gold tracking-[0.08em] uppercase",
          sizes[size],
        )}
        style={{ fontWeight: 500 }}
      >
        {BRAND.name}
      </span>
      {showTagline && (
        <span className="eyebrow mt-2 text-[10px] md:text-xs opacity-80">
          {BRAND.tagline}
        </span>
      )}
    </div>
  );
}
