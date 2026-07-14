import { useState } from "react";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Ornament } from "./Ornament";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[oklch(0.11_0.005_60/0.85)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">Maison</span>
          <h3 className="font-display text-4xl md:text-5xl text-gold mt-2 tracking-[0.08em] uppercase">
            {BRAND.name}
          </h3>
          <Ornament className="w-40 h-5 mt-4 text-gold/70" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-14">
          <div>
            <h4 className="eyebrow text-gold">Visit</h4>
            <p className="mt-4 text-ivory/80 flex items-start gap-3 text-sm leading-relaxed">
              <MapPin className="h-4 w-4 mt-1 text-gold shrink-0" /> {BRAND.address}
            </p>
            <p className="mt-3 text-ivory/80 flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gold shrink-0" /> {BRAND.phone}
            </p>
            <p className="mt-3 text-ivory/80 flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-gold shrink-0" /> {BRAND.email}
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-ivory/80">
              {BRAND.hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-ivory">{h.day}</span>
                  <span className="text-ivory/60">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Follow</h4>
            <div className="flex gap-3 mt-4">
              {[
                { Icon: Instagram, href: BRAND.socials.instagram },
                { Icon: Facebook, href: BRAND.socials.facebook },
                { Icon: Twitter, href: BRAND.socials.twitter },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="inline-flex h-10 w-10 items-center justify-center gold-hairline rounded-sm text-gold hover:bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-ivory/60 leading-relaxed">
              Private dining rooms and heritage events by appointment. Kindly attire smart-elegant.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Royal Dispatch</h4>
            <p className="mt-4 text-sm text-ivory/70">
              Seasonal menus, chef's evenings and private feasts, delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("Welcome to the royal dispatch.");
                setEmail("");
              }}
              className="mt-4 flex gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent gold-hairline rounded-sm px-3 py-2 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-1 focus:ring-[var(--gold)]"
              />
              <button className="btn-royal btn-royal-hover text-[10px] px-4">Join</button>
            </form>
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-ivory/40 tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} {BRAND.name} — Crafted with reverence for the royal table.
        </p>
      </div>
    </footer>
  );
}
