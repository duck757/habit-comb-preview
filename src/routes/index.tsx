import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HabitComb } from "@/components/HabitComb";
import { StoreButtons } from "@/components/StoreButtons";
import logo from "@/assets/habitcomb-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HabitComb" className="w-8 h-8 bg-primary p-1 rounded-md" />
            <span className="font-display text-lg font-bold tracking-tight">HabitComb</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#preview" className="hover:text-foreground transition-colors">Preview</a>
            <a href="#system" className="hover:text-foreground transition-colors">System</a>
            <a href="#download" className="hover:text-foreground transition-colors">Download</a>
          </div>
          <a
            href="#download"
            className="hidden sm:inline-flex items-center bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            Get the app
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Now in beta · iOS &amp; Android
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight max-w-4xl"
        >
          Train your habits like an{" "}
          <span className="font-serif-accent text-accent">athlete.</span>
        </motion.h1>

        <div className="mt-10 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <p className="text-lg sm:text-xl max-w-xl leading-relaxed text-muted-foreground">
            HabitComb is a quiet, focused habit tracker. One tap per day, a clean honeycomb
            grid, and the discipline of small reps that compound into real performance.
          </p>
          <div id="download" className="flex flex-col gap-3">
            <StoreButtons />
          </div>
        </div>

        {/* Stat strip */}
        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-border pt-8">
          {[
            { v: "12,400+", l: "Active members" },
            { v: "4.9", l: "App Store rating" },
            { v: "0 €", l: "Forever free" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl sm:text-3xl font-bold">{s.v}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIEW */}
      <section id="preview" className="bg-secondary/40 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
              Interactive preview
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-5">
              Tap a cell.{" "}
              <span className="font-serif-accent text-muted-foreground">Own the week.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              This isn't a screenshot — it's the real thing. Log a habit below and watch your
              comb fill in real time. That's the entire product.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-honey"
          >
            <HabitComb />
          </motion.div>
        </div>
      </section>

      {/* SYSTEM / FEATURES */}
      <section id="system" className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
            The system
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Built for repetition,{" "}
            <span className="font-serif-accent text-muted-foreground">not motivation.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01", t: "The Grid", d: "Your week is a seven-cell honeycomb. Fill it in. Don't break the row." },
            { n: "02", t: "Streaks", d: "Honest counters. No confetti, no streak-saving microtransactions — just numbers that climb." },
            { n: "03", t: "Sunday Report", d: "A weekly debrief: what you did, what you skipped, what you'll attack next week." },
          ].map((f) => (
            <div
              key={f.n}
              className="rounded-2xl bg-card border border-border p-7 hover:shadow-comb hover:-translate-y-0.5 transition-all"
            >
              <div className="text-xs font-semibold tracking-[0.2em] text-accent mb-10">{f.n}</div>
              <div className="font-display text-2xl font-bold mb-3">{f.t}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-[1200px] mx-auto bg-primary text-primary-foreground rounded-3xl px-8 sm:px-14 py-16 grid md:grid-cols-2 gap-10 items-end shadow-honey">
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]">
            Start{" "}
            <span className="font-serif-accent text-accent">day one.</span>
          </h2>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="text-base text-primary-foreground/70 max-w-sm md:text-right">
              Free forever. No ads. No dark patterns. Just the grid, the streak, and you.
            </p>
            <StoreButtons invert />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HabitComb" className="w-6 h-6 bg-primary p-0.5 rounded" />
            <span className="font-display font-bold">HabitComb</span>
            <span className="text-xs text-muted-foreground ml-2">© 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Press</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
