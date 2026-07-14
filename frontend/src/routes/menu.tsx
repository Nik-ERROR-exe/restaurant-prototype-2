import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, DISHES, type Category } from "@/lib/menu-data";
import { DishCard } from "@/components/DishCard";
import { Ornament } from "@/components/Ornament";
import { cn } from "@/lib/utils";

type Filter = "All" | Category;

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "The Menu — Maharaja" },
      {
        name: "description",
        content:
          "Signature Mughal, Awadhi and Rajasthani preparations. Explore starters, main course, biryani, breads, desserts and beverages.",
      },
      { property: "og:title", content: "The Menu — Maharaja" },
      {
        property: "og:description",
        content: "Explore the royal menu of Maharaja — heritage Indian fine dining.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? DISHES : DISHES.filter((d) => d.category === filter)),
    [filter],
  );

  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]" />
        </div>
        <div className="relative text-center px-6">
          <span className="eyebrow">Est. Royal Kitchens</span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-gold">Our Menu</h1>
          <Ornament className="w-52 h-6 text-gold/70 mx-auto mt-4" />
          <p className="mt-4 max-w-2xl mx-auto text-ivory/75">
            A living manuscript of India's regal kitchens — from tandoor-charred starters to
            saffron-veiled desserts.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[68px] z-30 bg-[oklch(0.11_0.005_60/0.92)] backdrop-blur-md border-y border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
        <div className="mx-auto max-w-7xl px-4 md:px-10 py-4 flex gap-2 overflow-x-auto scrollbar-none">
          {(["All", ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 font-display uppercase text-xs tracking-[0.2em] px-4 py-2 rounded-sm border transition-colors",
                filter === c
                  ? "bg-gold text-[var(--ink)] border-[var(--gold)]"
                  : "text-ivory/80 border-[color-mix(in_oklab,var(--gold)_30%,transparent)] hover:text-gold hover:border-[var(--gold)]",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => (
              <DishCard key={d.id} dish={d} showStepper />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-ivory/60 py-20">No dishes in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}
