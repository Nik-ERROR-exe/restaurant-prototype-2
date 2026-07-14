import { createFileRoute } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Maharaja" },
      {
        name: "description",
        content:
          "The heritage of Maharaja — generations of royal chefs, palace recipes and an ambience carved from India's regal past.",
      },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    year: "1887",
    title: "The Royal Kitchen",
    body: "Khansama Rai Singh is appointed head chef to the Rajput court of Mewar, safeguarding a book of 300 recipes.",
  },
  {
    year: "1932",
    title: "A Family Craft",
    body: "The Singh family opens a private dining room in Jaipur, hosting royals, envoys and visiting poets by invitation.",
  },
  {
    year: "1978",
    title: "Doors to the World",
    body: "The dining room becomes a public restaurant, its walls hung with fragments of the original haveli.",
  },
  {
    year: "Today",
    title: "Maharaja Reimagined",
    body: "The fourth generation restores the palace kitchen to its full splendour — old recipes, new reverence.",
  },
];

const AMBIENCE = [
  "photo-1552566626-52f8b828add9",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1414235077428-338989a2e8c0",
  "photo-1600891964599-f61ba0e24092",
  "photo-1559339352-11d035aa65de",
  "photo-1590846406792-0adc7f938f1d",
];

function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]" />
        </div>
        <div className="relative text-center px-6">
          <span className="eyebrow">Our Heritage</span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-gold">Our Story</h1>
          <Ornament className="w-52 h-6 text-gold/70 mx-auto mt-4" />
        </div>
      </section>

      {/* Narrative */}
      <section className="px-6 md:px-10 pb-16">
        <div className="mx-auto max-w-4xl royal-card p-8 md:p-14">
          <p className="font-display italic text-2xl md:text-3xl text-gold leading-snug">
            “To eat at {BRAND.name} is to be received as a guest of the court.”
          </p>
          <div className="mt-8 space-y-5 text-ivory/85 leading-relaxed">
            <p>
              For four generations, the Singh family has kept an unbroken flame in the royal
              kitchens of Rajasthan. Ours is a cuisine born not of restaurants, but of palaces —
              where a single dal simmered through the night over embers of sandalwood, and where a
              biryani was sealed with saffron dough by hands that also inked royal decrees.
            </p>
            <p>
              At {BRAND.name}, that inheritance is not preserved behind glass. It is served,
              nightly, under candlelight and hand-painted ceilings. Every spice is ground the old
              way. Every gravy is finished with the patience of an age that measured hours in
              incense, not minutes.
            </p>
            <p>
              We welcome you not as a patron, but as a guest at the royal table.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ivory">
              A <span className="text-gold italic">Century</span> in the Kitchen
            </h2>
            <Ornament className="w-40 h-5 text-gold/70 mx-auto mt-4" />
          </div>

          <ol className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[color-mix(in_oklab,var(--gold)_40%,transparent)]" />
            {TIMELINE.map((m, i) => (
              <li
                key={m.year}
                className={`relative mb-12 md:mb-16 md:grid md:grid-cols-2 md:gap-12 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div className={`pl-14 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <span className="eyebrow text-gold">{m.year}</span>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-ivory">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-ivory/70 leading-relaxed">{m.body}</p>
                </div>
                <span className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gold ring-4 ring-[var(--ink)]" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Chef spotlight */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-y border-[color-mix(in_oklab,var(--gold)_20%,transparent)]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="royal-card overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85"
              alt="Chef Vikram Singh"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>
          <div>
            <span className="eyebrow">Chef & Custodian</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-gold">
              Vikram Singh
            </h2>
            <Ornament className="w-40 h-5 text-gold/70 mt-4" />
            <p className="mt-6 font-display italic text-xl text-ivory/90 leading-relaxed">
              “A recipe is not written to be followed. It is written to be remembered.
              Our task is to remember out loud, night after night.”
            </p>
            <p className="mt-6 text-ivory/70 leading-relaxed">
              The fourth-generation guardian of the family's culinary heritage, Chef Vikram
              trained in the royal kitchens of Udaipur before returning to lead {BRAND.name}.
              His menus draw from a handwritten ledger of 300 recipes — some rewritten, most
              untouched since 1887.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="eyebrow">The Room</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ivory">
              An <span className="text-gold italic">Ambience</span> of Kings
            </h2>
            <Ornament className="w-40 h-5 text-gold/70 mx-auto mt-4" />
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {AMBIENCE.map((id, i) => (
              <div
                key={id}
                className={`royal-card overflow-hidden ${
                  i % 5 === 0 ? "md:row-span-2 md:col-span-1" : ""
                }`}
              >
                <img
                  src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-[1200ms]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
