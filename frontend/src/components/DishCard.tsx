import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Dish } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";
import { VegDot } from "./VegDot";
import { toast } from "sonner";

export function DishCard({ dish, showStepper = false }: { dish: Dish; showStepper?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    add(dish, qty);
    toast.success(`${dish.name} added to your order`, {
      description: `${qty} × ₹${dish.price}`,
    });
    setQty(1);
  };

  return (
    <article className="royal-card overflow-hidden group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent" />
        {dish.signature && (
          <span className="absolute top-3 left-3 eyebrow bg-[var(--ink)]/70 gold-hairline px-2 py-1 text-[9px]">
            Signature
          </span>
        )}
        <span className="absolute top-3 right-3 bg-[var(--ink)]/80 p-1">
          <VegDot veg={dish.veg} />
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl md:text-2xl text-ivory leading-tight">
            {dish.name}
          </h3>
          <span className="font-display text-gold text-lg whitespace-nowrap">
            ₹{dish.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-ivory/70 leading-relaxed flex-1">
          {dish.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          {showStepper ? (
            <div className="inline-flex items-center gold-hairline rounded-sm">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-9 w-9 grid place-items-center text-gold hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
                aria-label="Decrease"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-ivory font-display">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-9 w-9 grid place-items-center text-gold hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
                aria-label="Increase"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <span />
          )}
          <button onClick={handleAdd} className="btn-royal-outline text-[10px] px-4 py-2">
            Add to Order
          </button>
        </div>
      </div>
    </article>
  );
}
