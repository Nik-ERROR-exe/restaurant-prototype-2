import { useState } from "react";
import { Minus, Plus, Trash2, X, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Ornament } from "./Ornament";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal, clear, count } = useCart();
  const [confirmed, setConfirmed] = useState(false);

  const proceed = () => setConfirmed(true);
  const close = () => {
    setOpen(false);
    setTimeout(() => setConfirmed(false), 400);
  };

  return (
    <>
      {/* Floating button */}
      {count > 0 && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 btn-royal btn-royal-hover shadow-2xl"
        >
          Your Order
          <span className="ml-1 inline-grid place-items-center h-6 min-w-6 rounded-full bg-[var(--ink)] text-gold text-xs px-1.5">
            {count}
          </span>
        </button>
      )}

      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[oklch(0.11_0.005_60)] border-l border-[color-mix(in_oklab,var(--gold)_30%,transparent)] transform transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)]">
          <div>
            <span className="eyebrow">Your Order</span>
            <h3 className="font-display text-2xl text-gold mt-1">Royal Cart</h3>
          </div>
          <button
            onClick={close}
            className="h-9 w-9 grid place-items-center gold-hairline rounded-sm text-gold hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {confirmed ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4 animate-royal-in">
            <div className="h-16 w-16 rounded-full grid place-items-center bg-gold text-[var(--ink)]">
              <Check className="h-7 w-7" />
            </div>
            <Ornament className="w-40 h-5 text-gold/70" />
            <h4 className="font-display text-3xl text-gold">Order Confirmed</h4>
            <p className="text-ivory/70 leading-relaxed">
              Your feast is being prepared with royal care. Our steward will be with you shortly.
            </p>
            <button
              onClick={() => {
                clear();
                close();
              }}
              className="btn-royal-outline mt-4"
            >
              Continue
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-3">
            <Ornament className="w-40 h-5 text-gold/70" />
            <p className="font-display text-2xl text-ivory">Your table awaits</p>
            <p className="text-ivory/60 text-sm">
              Add dishes from the menu to compose your royal feast.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ dish, qty }) => (
                <div key={dish.id} className="flex gap-4 border-b border-[color-mix(in_oklab,var(--gold)_15%,transparent)] pb-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="h-20 w-20 object-cover rounded-sm gold-hairline"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h4 className="font-display text-lg text-ivory truncate">{dish.name}</h4>
                      <button
                        onClick={() => remove(dish.id)}
                        className="text-ivory/50 hover:text-[var(--gold)]"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gold text-sm mt-0.5">₹{dish.price}</p>
                    <div className="mt-2 inline-flex items-center gold-hairline rounded-sm">
                      <button
                        onClick={() => setQty(dish.id, qty - 1)}
                        className="h-8 w-8 grid place-items-center text-gold"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-ivory text-sm">{qty}</span>
                      <button
                        onClick={() => setQty(dish.id, qty + 1)}
                        className="h-8 w-8 grid place-items-center text-gold"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[color-mix(in_oklab,var(--gold)_25%,transparent)] px-6 py-5 space-y-4">
              <div className="flex justify-between font-display text-lg">
                <span className="text-ivory/80">Subtotal</span>
                <span className="text-gold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[10px] text-ivory/50 uppercase tracking-[0.2em]">
                Taxes and royal service applied at billing
              </p>
              <button onClick={proceed} className="btn-royal btn-royal-hover w-full">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
