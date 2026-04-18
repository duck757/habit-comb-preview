import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HabitComb } from "@/components/HabitComb";
import { StoreButtons } from "@/components/StoreButtons";

export const Route = createFileRoute("/")({
  component: Index,
});

function Hexagon({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`hex ${className}`} style={style} />;
}

function Index() {
  return (
    <main className="relative overflow-hidden">
      {/* floating decorative hexagons */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Hexagon className="absolute top-20 -left-10 w-40 h-40 opacity-30 animate-float bg-gradient-honey" />
        <Hexagon className="absolute top-96 right-10 w-24 h-24 opacity-40 animate-float bg-gradient-honey" style={{ animationDelay: "1.5s" }} />
        <Hexagon className="absolute bottom-40 left-1/4 w-16 h-16 opacity-30 animate-float bg-gradient-honey" style={{ animationDelay: "3s" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10">
            <Hexagon className="absolute inset-0 bg-gradient-honey shadow-honey" />
            <span className="absolute inset-0 grid place-items-center text-xl">🐝</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">HabitComb</span>
        </div>
        <div className="hidden sm:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#preview" className="hover:text-foreground transition">Try it</a>
          <a href="#download" className="hover:text-foreground transition">Download</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-3 py-1.5 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Now in early access · 12,000+ buzzing
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
            Build <span className="text-gradient-honey">sweet habits</span>,
            <br />one cell at a time.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            HabitComb turns your daily routines into a living honeycomb. Tap a cell, fill your week,
            and watch tiny consistent actions become a hive of progress.
          </p>

          <div className="mt-8" id="download">
            <StoreButtons />
            <p className="mt-3 text-xs text-muted-foreground">Free forever · No ads · Your data stays yours</p>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-2">
              {["🦊","🐻","🐼","🦉"].map((e,i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-card border-2 border-background grid place-items-center text-base shadow-sm">{e}</div>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold">★★★★★ 4.9 / 5</div>
              <div className="text-muted-foreground text-xs">from early beekeepers</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          id="preview"
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-honey opacity-20 blur-3xl rounded-full" />
          <div className="relative">
            <HabitComb />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Why HabitComb</div>
          <h2 className="text-4xl sm:text-5xl font-bold">A hive built for humans, not robots.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { e: "🍯", t: "Visual streaks", d: "Your week becomes a living comb. Each filled cell is a tiny win you can actually see." },
            { e: "🔔", t: "Gentle nudges", d: "Smart reminders that adapt to your rhythm. No nagging, just the right buzz at the right time." },
            { e: "📈", t: "Honest insights", d: "Weekly reports that celebrate progress and surface patterns — without the toxic productivity vibe." },
          ].map((f) => (
            <div key={f.t} className="group relative rounded-3xl border bg-card/70 backdrop-blur p-7 hover:shadow-comb transition-all hover:-translate-y-1">
              <div className="w-14 h-14 hex bg-gradient-honey grid place-items-center text-2xl mb-5 shadow-honey">
                {f.e}
              </div>
              <h3 className="text-xl font-bold mb-2">{f.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-honey p-10 sm:p-16 text-center shadow-honey">
          <div className="absolute -top-10 -right-10 w-48 h-48 hex bg-background/10" />
          <div className="absolute -bottom-16 -left-10 w-56 h-56 hex bg-background/10" />
          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground max-w-2xl mx-auto leading-tight">
              Start your first cell today.
            </h2>
            <p className="mt-4 text-foreground/80 max-w-lg mx-auto">
              Download HabitComb and turn one small action into a beautiful, buzzing routine.
            </p>
            <div className="mt-8 flex justify-center">
              <StoreButtons />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 hex bg-gradient-honey" />
            <span className="font-semibold text-foreground">HabitComb</span>
            <span>© 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
