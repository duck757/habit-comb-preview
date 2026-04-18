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
      {/* Top ticker */}
      <div className="bg-foreground text-background overflow-hidden border-b border-foreground">
        <div className="marquee-track whitespace-nowrap py-2 text-xs font-bold uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="inline-flex">
              {["Discipline > Motivation", "Build the comb", "Day 001", "No excuses", "Now in beta", "Ship your streak"].map((t, i) => (
                <span key={i} className="px-8 inline-flex items-center gap-8">
                  {t}<span className="opacity-40">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="HabitComb" className="w-8 h-8 bg-foreground p-0.5" />
            <span className="font-display text-2xl tracking-tight">HABITCOMB</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#manifesto" className="hover:opacity-60">Manifesto</a>
            <a href="#preview" className="hover:opacity-60">Preview</a>
            <a href="#features" className="hover:opacity-60">System</a>
            <a href="#download" className="hover:opacity-60">Get App</a>
          </div>
          <a href="#download" className="hidden sm:inline-block bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80">
            Download
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-[1400px] mx-auto px-6 pt-12 pb-20">
        <div className="flex items-start justify-between mb-8">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Vol. 01 — The Habit Issue
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
            Est. 2026 / iOS · Android
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-[20vw] sm:text-[16vw] lg:text-[200px] leading-[0.85] tracking-tighter"
        >
          BUILD<br />
          THE<br />
          <span className="italic" style={{ fontStyle: "italic" }}>COMB.</span>
        </motion.h1>

        <div className="mt-10 grid md:grid-cols-[2fr_1fr] gap-8 items-end border-t border-foreground pt-8">
          <p className="text-lg sm:text-xl max-w-xl leading-snug font-medium">
            One cell. One day. One rep. HabitComb is the habit tracker for people who don't need a pep talk —
            just a clean grid and the discipline to fill it.
          </p>
          <div id="download" className="flex flex-col gap-3">
            <StoreButtons />
          </div>
        </div>
      </section>

      {/* PREVIEW SECTION */}
      <section id="preview" className="bg-background border-y border-foreground">
        <div className="max-w-[1400px] mx-auto px-6 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
              / 002 — Interactive
            </div>
            <h2 className="font-display text-6xl sm:text-7xl leading-[0.9] mb-6">
              TAP A<br />CELL.<br />OWN THE<br />WEEK.
            </h2>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              This isn't a screenshot. Log a habit below — every cell you fill compounds.
              That's the whole product.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <div className="font-display text-4xl">12K+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">Athletes</div>
              </div>
              <div className="w-px h-12 bg-foreground/20" />
              <div>
                <div className="font-display text-4xl">4.9</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">Rating</div>
              </div>
              <div className="w-px h-12 bg-foreground/20" />
              <div>
                <div className="font-display text-4xl">∞</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">Free</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HabitComb />
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO marquee */}
      <section id="manifesto" className="bg-foreground text-background py-20 overflow-hidden">
        <div className="marquee-track whitespace-nowrap font-display text-[14vw] leading-none tracking-tighter">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="inline-flex items-center">
              <span className="px-8">SHOW UP.</span>
              <span className="px-8 opacity-30">·</span>
              <span className="px-8 italic">FILL THE CELL.</span>
              <span className="px-8 opacity-30">·</span>
              <span className="px-8">REPEAT.</span>
              <span className="px-8 opacity-30">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-16">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            / 003 — The System
          </div>
          <h2 className="font-display text-6xl sm:text-7xl leading-[0.9]">
            BUILT FOR<br />REPETITION.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 border-t border-foreground">
          {[
            { n: "01", t: "GRID", d: "Your week is a 7-cell grid. Fill it. Don't break the row." },
            { n: "02", t: "STREAKS", d: "Cold, honest counters. No celebratory animations. Just numbers that climb." },
            { n: "03", t: "REPORTS", d: "Weekly drops on Sunday. What you did. What you skipped. What you'll attack next." },
          ].map((f) => (
            <div key={f.n} className="border-b md:border-b-0 md:border-r last:border-r-0 border-foreground py-10 px-6 group hover:bg-foreground hover:text-background transition-colors">
              <div className="text-xs font-bold tracking-[0.3em] mb-16">{f.n}</div>
              <div className="font-display text-4xl mb-4">{f.t}</div>
              <p className="text-sm leading-relaxed opacity-80 max-w-xs">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-end">
          <h2 className="font-display text-6xl sm:text-8xl leading-[0.85]">
            START<br />
            <span className="italic">DAY 001.</span>
          </h2>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="text-base text-background/70 max-w-sm md:text-right">
              Free. No ads. No streak-saving microtransactions. Just the grid.
            </p>
            <StoreButtons invert />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HabitComb" className="w-6 h-6 bg-foreground p-0.5" />
            <span className="font-display text-lg">HABITCOMB</span>
            <span className="text-xs text-muted-foreground ml-2">© 2026</span>
          </div>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
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
