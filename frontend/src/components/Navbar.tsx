import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/reservations", label: "Reservations" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  const solid = scrolled || !isHome || openMobile;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-[oklch(0.1_0.005_60/0.92)] backdrop-blur-md border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="text-gold font-display text-xl md:text-2xl tracking-[0.24em] uppercase">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display uppercase text-[0.78rem] tracking-[0.28em] text-ivory/85 hover:text-gold transition-colors relative"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="relative hidden md:inline-flex h-10 w-10 items-center justify-center gold-hairline rounded-sm text-gold hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition"
            aria-label="Open order"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 h-5 min-w-5 rounded-full bg-gold text-[10px] font-semibold text-[var(--ink)] grid place-items-center px-1">
                {count}
              </span>
            )}
          </button>

          <Link to="/reservations" className="hidden md:inline-flex btn-royal btn-royal-hover text-xs">
            Book a Table
          </Link>

          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center text-gold gold-hairline rounded-sm"
            aria-label="Menu"
          >
            {openMobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {openMobile && (
        <div className="lg:hidden border-t border-[color-mix(in_oklab,var(--gold)_20%,transparent)] bg-[oklch(0.1_0.005_60/0.98)]">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display uppercase tracking-[0.28em] text-sm text-ivory/85"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Link to="/reservations" className="btn-royal btn-royal-hover text-xs flex-1">
                Book a Table
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="relative inline-flex h-11 w-11 items-center justify-center gold-hairline rounded-sm text-gold"
                aria-label="Open order"
              >
                <ShoppingBag className="h-4 w-4" />
                {count > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 h-5 min-w-5 rounded-full bg-gold text-[10px] font-semibold text-[var(--ink)] grid place-items-center px-1">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
