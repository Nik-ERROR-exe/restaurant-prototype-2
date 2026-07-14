import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Check, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ornament } from "@/components/Ornament";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations — Maharaja" },
      {
        name: "description",
        content:
          "Reserve your seat at the royal table. Private dining rooms, heritage evenings and chef's tastings by appointment.",
      },
    ],
  }),
  component: ReservationsPage,
});

const TIMES = [
  "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
  "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
  "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

function ReservationsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="royal-card p-10 md:p-16 max-w-2xl text-center animate-royal-in">
          <div className="h-20 w-20 mx-auto rounded-full grid place-items-center bg-gold text-[var(--ink)]">
            <Check className="h-9 w-9" />
          </div>
          <Ornament className="w-56 h-6 text-gold/70 mx-auto mt-8" />
          <h1 className="mt-6 font-display text-4xl md:text-5xl text-gold">
            Your table has been reserved
          </h1>
          <p className="mt-4 text-ivory/80 leading-relaxed">
            We look forward to hosting <span className="text-gold">{name || "you"}</span> for{" "}
            <span className="text-gold">{guests}</span> guest{guests > 1 ? "s" : ""}
            {date && (
              <>
                {" "}on <span className="text-gold">{format(date, "EEEE, do MMMM yyyy")}</span>
              </>
            )}
            {time && <> at <span className="text-gold">{time}</span></>}.
          </p>
          <p className="mt-4 text-ivory/60 text-sm">
            A confirmation has been dispatched to {email || "your inbox"}. Our concierge will
            reach out shortly should any special preparations be required.
          </p>
          <Ornament className="w-56 h-6 text-gold/70 mx-auto mt-8" />
          <button
            onClick={() => {
              setConfirmed(false);
              setName(""); setPhone(""); setEmail(""); setDate(undefined);
              setTime(""); setGuests(2); setNotes("");
            }}
            className="btn-royal-outline mt-8"
          >
            Make Another Reservation
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]" />
        </div>
        <div className="relative text-center px-6">
          <span className="eyebrow">Reserve Your Seat</span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-gold">Reservations</h1>
          <Ornament className="w-52 h-6 text-gold/70 mx-auto mt-4" />
          <p className="mt-4 max-w-xl mx-auto text-ivory/75">
            Every table is prepared with ceremony. Kindly reserve in advance for weekend evenings
            and private dining rooms.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <form onSubmit={onSubmit} className="mx-auto max-w-3xl royal-card p-8 md:p-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Full Name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                placeholder="Maharani Devi"
              />
            </Field>
            <Field label="Phone">
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls}
                placeholder="+91 98xxx xxxxx"
              />
            </Field>
            <Field label="Email" className="md:col-span-2">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Date">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      inputCls,
                      "flex items-center gap-2 text-left",
                      !date && "text-ivory/40",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 text-gold" />
                    {date ? format(date, "EEEE, do MMMM yyyy") : "Choose a date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[oklch(0.13_0.005_60)] gold-hairline" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field label="Time">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold pointer-events-none" />
                <select
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={cn(inputCls, "pl-9 appearance-none")}
                >
                  <option value="" disabled>Choose a time</option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </Field>

            <Field label="Guests" className="md:col-span-2">
              <div className="flex items-center gap-4">
                <Users className="h-4 w-4 text-gold" />
                <div className="flex flex-wrap gap-2">
                  {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setGuests(n)}
                      className={cn(
                        "h-10 w-10 rounded-sm border font-display transition-colors",
                        guests === n
                          ? "bg-gold text-[var(--ink)] border-[var(--gold)]"
                          : "border-[color-mix(in_oklab,var(--gold)_35%,transparent)] text-ivory hover:border-[var(--gold)]",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </Field>

            <Field label="Special Requests" className="md:col-span-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className={cn(inputCls, "resize-none")}
                placeholder="Anniversary, dietary preferences, private dining room…"
              />
            </Field>
          </div>

          <div className="pt-2 text-center">
            <button type="submit" className="btn-royal btn-royal-hover">
              Reserve My Table
            </button>
            <p className="mt-4 text-[10px] text-ivory/50 uppercase tracking-[0.25em]">
              We will confirm within the hour
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

const inputCls =
  "w-full bg-transparent gold-hairline rounded-sm px-3 py-2.5 text-ivory placeholder:text-ivory/40 focus:outline-none focus:ring-1 focus:ring-[var(--gold)] focus:border-[var(--gold)]";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="eyebrow text-gold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
