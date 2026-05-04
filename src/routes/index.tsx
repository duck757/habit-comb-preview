import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, Camera, Flame, BarChart3 } from "lucide-react";
import { HabitComb } from "@/components/HabitComb";
import { StoreButtons } from "@/components/StoreButtons";
import logo from "@/assets/habitcomb-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const goals = [
  { goal: "Run 5K every morning", color: "#fde68a", rotate: -6 },
  { goal: "Read 20 minutes daily", color: "#fcd34d", rotate: 4 },
  { goal: "Drink 3L of water", color: "#fbbf24", rotate: -3 },
  { goal: "Train strength 4×/week", color: "#fef08a", rotate: 7 },
  { goal: "Sleep before 11 PM", color: "#fed7aa", rotate: -5 },
];

function Index() {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false, false]);
  const toggleNote = (i: number) =>
    setRevealed((r) => r.map((v, idx) => (idx === i ? !v : v)));

  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-20">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HabitComb" className="w-9 h-9 rounded-xl" />
            <span className="text-xl font-bold tracking-tight">HabitComb</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Home</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#preview" className="hover:text-foreground transition-colors">Preview</a>
            <a href="#download" className="hover:text-foreground transition-colors">Download</a>
          </div>
          <a
            href="#download"
            className="hidden sm:inline-flex bg-foreground text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get the app
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{ background: "var(--gradient-radial)" }}
        />
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            {/* Social proof pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-secondary rounded-full pl-2 pr-5 py-2 mb-8"
            >
              <div className="flex -space-x-2">
                {["#fbbf24", "#f59e0b", "#fcd34d"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <span>Loved by 12K+ users</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">4.9</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.02]"
            >
              Meet HabitComb
              <br />
              <span className="text-accent">Build sweet habits,</span>
              <br />
              one cell at a time
            </motion.h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              The friendly habit tracker that turns your week into a honeycomb.
              Tap a cell, build a streak, watch your comb fill up — it's that simple.
            </p>

            <div id="download" className="mt-8">
              <StoreButtons />
            </div>
          </div>

          {/* RIGHT — phone mockup with honeycomb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating tags */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-0 lg:left-4 z-20 bg-white rounded-2xl shadow-comb px-4 py-2.5 text-sm font-semibold flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              7-day streak
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 right-0 lg:right-4 z-20 bg-white rounded-2xl shadow-comb px-4 py-2.5 text-sm font-semibold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              +1 cell filled
            </motion.div>

            {/* Phone frame */}
            <div className="relative w-[320px] sm:w-[360px] bg-foreground rounded-[3rem] p-3 shadow-honey">
              <div className="bg-foreground rounded-[2.4rem] overflow-hidden">
                <div className="h-6 flex items-center justify-center">
                  <div className="w-24 h-5 bg-black rounded-full" />
                </div>
                <HabitComb />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="border-y border-border bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-semibold text-muted-foreground">
          <span className="text-foreground">As seen in</span>
          <span>Product Hunt</span>
          <span>·</span>
          <span>The Verge</span>
          <span>·</span>
          <span>Lifehacker</span>
          <span>·</span>
          <span>Wired</span>
          <span>·</span>
          <span>Fast Company</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block bg-secondary rounded-full px-4 py-1.5 text-xs font-bold text-muted-foreground mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Tracking habits has never been this satisfying
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Three taps. Zero friction. A whole new way to see your week.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Camera className="w-6 h-6" />,
              t: "Tap a cell",
              d: "Each day is a hexagon. Tap to log — no menus, no friction.",
            },
            {
              icon: <Flame className="w-6 h-6" />,
              t: "Build streaks",
              d: "Watch your comb fill up as your habits compound, day by day.",
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              t: "See progress",
              d: "Weekly drops every Sunday — clean stats, zero noise.",
            },
          ].map((f) => (
            <div
              key={f.t}
              className="bg-secondary/60 rounded-3xl p-8 hover:bg-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-foreground text-white flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <div className="text-xl font-bold mb-2">{f.t}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE PREVIEW */}
      <section id="preview" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-secondary/50 rounded-[2.5rem] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block bg-background rounded-full px-4 py-1.5 text-xs font-bold text-muted-foreground mb-4">
              TRY IT LIVE
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              This isn't a screenshot.
              <br />
              <span className="text-accent">Tap a cell.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-md">
              Every cell you fill is a small win. That's the whole product —
              and it works.
            </p>
            <div className="mt-8 flex gap-8">
              <div>
                <div className="text-3xl font-extrabold">12K+</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1">USERS</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">4.9★</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1">RATING</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold">Free</div>
                <div className="text-xs font-semibold text-muted-foreground mt-1">FOREVER</div>
              </div>
            </div>
          </div>

          <div className="bg-foreground rounded-3xl overflow-hidden shadow-honey">
            <HabitComb />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-foreground text-white rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "var(--gradient-honey)" }}
          />
          <div className="relative">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-2xl mx-auto">
              Start your first cell today.
            </h2>
            <p className="mt-4 text-white/70 text-lg max-w-md mx-auto">
              Free forever. No ads. Just you and your comb.
            </p>
            <div className="mt-8 flex justify-center">
              <StoreButtons invert />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="HabitComb" className="w-7 h-7 rounded-lg" />
            <span className="font-bold">HabitComb</span>
            <span className="text-sm text-muted-foreground ml-2">© 2026</span>
          </div>
          <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
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
