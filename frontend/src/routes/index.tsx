import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Sparkles, Landmark, Quote } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { BrandMark } from "@/components/BrandMark";
import { Ornament } from "@/components/Ornament";
import { DishCard } from "@/components/DishCard";
import { SIGNATURE_DISHES } from "@/lib/menu-data";
import { ScrollSequence } from "@/components/ScrollSequence";

export const Route = createFileRoute("/")(
  {
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { title: "Maharaja — A Royal Feast, Reimagined" },
      {
        name: "description",
        content:
          "Palace-inspired Indian fine dining. Heritage Mughal & Rajasthani recipes, curated spice trails, and an ambience worthy of kings.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    Icon: ChefHat,
    title: "Royal Recipes",
    body: "Heirloom formulas rescued from Mughal, Awadhi and Rajput palace kitchens, preserved by generations of khansamas.",
  },
  {
    Icon: Sparkles,
    title: "Handpicked Spices",
    body: "Saffron from Pampore, cardamom from the Cardamom Hills, chillies from Mathania — sourced by hand, ground on stone.",
  },
  {
    Icon: Landmark,
    title: "Timeless Ambience",
    body: "Frescoed ceilings, jharokha alcoves and candlelit thalis — a dining hall that remembers the age of maharajas.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "A palace on a plate. The Laal Maas alone is reason enough to travel across the country.",
    who: "Condé Nast Traveller India",
  },
  {
    quote:
      "The most transporting Indian dining room outside of a Rajput fort. Immaculate, unhurried, unforgettable.",
    who: "The World's 50 Best — Discovery",
  },
  {
    quote:
      "Every dish arrives as if uncovered from a treasury. This is heritage cuisine at its most confident.",
    who: "Vir Sanghvi",
  },
];

function Home() {
  return (
    <>
      {/* SCROLL-LINKED FOOD ASSEMBLY SEQUENCE */}
      <ScrollSequence />

      {/* HERO REVEAL — fades into view after the scroll sequence unpins */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=2000&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/85 via-[var(--ink)]/60 to-[var(--ink)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--ink)_85%)]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl animate-royal-fade">
          <Ornament className="w-52 h-6 text-gold mx-auto" />
          <div className="mt-6">
            <BrandMark size="xl" />
          </div>
          <p className="mt-8 font-display italic text-xl md:text-2xl text-ivory/85 tracking-wide">
            {BRAND.tagline}
          </p>
          <p className="mt-4 text-ivory/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            An evening at {BRAND.name} is a slow procession through India's royal kitchens — 
            saffron-lit, spice-perfumed, and served with the ceremony of a bygone age.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/reservations" className="btn-royal btn-royal-hover">
              Book a Table
            </Link>
            <Link to="/menu" className="btn-royal-outline">
              View the Menu
            </Link>
          </div>
          <Ornament className="w-52 h-6 text-gold/70 mx-auto mt-14" />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold/70 text-[10px] tracking-[0.4em] uppercase animate-pulse">
          Scroll
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="eyebrow">The Royal Table</span>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-ivory">
              Signature <span className="text-gold italic">Dishes</span>
            </h2>
            <div className="filigree-divider mt-6 mx-auto max-w-md">
              <Ornament className="w-24 h-4" />
            </div>
            <p className="mt-4 max-w-xl mx-auto text-ivory/70">
              A selection from our chef's most celebrated preparations — each a chapter
              in India's culinary story.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SIGNATURE_DISHES.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/menu" className="btn-royal-outline">
              Explore the Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* WHY MAHARAJA */}
      <section className="relative py-24 md:py-32 px-6 md:px-10 border-y border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 300px at 20% 0%, oklch(0.32 0.14 15 / 0.4), transparent 60%), radial-gradient(500px 300px at 80% 100%, oklch(0.78 0.13 85 / 0.15), transparent 60%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">Our Ethos</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ivory">
              Why <span className="text-gold italic">{BRAND.name}</span>
            </h2>
            <Ornament className="w-40 h-5 text-gold/70 mx-auto mt-4" />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="royal-card p-8 md:p-10 text-center flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full grid place-items-center gold-hairline text-gold">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-gold">{title}</h3>
                <p className="mt-3 text-ivory/70 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="eyebrow">Royal Endorsements</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ivory">
              Spoken of in <span className="text-gold italic">high courts</span>
            </h2>
            <Ornament className="w-40 h-5 text-gold/70 mx-auto mt-4" />
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="royal-card p-8 flex flex-col">
                <Quote className="h-6 w-6 text-gold/70" />
                <p className="mt-4 font-display italic text-xl leading-relaxed text-ivory">
                  “{t.quote}”
                </p>
                <footer className="mt-6 eyebrow text-gold">— {t.who}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
