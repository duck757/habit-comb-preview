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

function seededGrid(seed: number, count: number, density: number): boolean[] {
  const grid: boolean[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    grid.push((s >>> 0) / 0xffffffff < density);
  }
  return grid;
}

const phoneWidgets = [
  { icon: "</>", label: "Side Hustle", color: "#fbbf24", density: 0.6, grid: seededGrid(42, 60, 0.6) },
  { icon: "🏃", label: "Running", color: "#34d399", custom: "multi" as const, grid: [] as boolean[] },
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

          {/* RIGHT — interactive sticky notes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[480px] sm:h-[520px] flex items-center justify-center"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
              Tap a note ↓
            </div>
            {goals.map((g, i) => {
              // Scattered positions (percentages)
              const positions = [
                { top: "8%", left: "4%" },
                { top: "12%", right: "6%" },
                { top: "44%", left: "22%" },
                { bottom: "10%", left: "0%" },
                { bottom: "6%", right: "8%" },
              ];
              const pos = positions[i];
              const isOpen = revealed[i];
              return (
                <motion.button
                  key={i}
                  onClick={() => toggleNote(i)}
                  initial={{ rotate: g.rotate, scale: 0, y: -20 }}
                  animate={{ rotate: g.rotate, scale: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.06, rotate: g.rotate * 0.4, zIndex: 30 }}
                  whileTap={{ scale: 0.96 }}
                  className="absolute w-40 h-40 sm:w-44 sm:h-44 p-4 flex items-center justify-center text-center font-bold text-foreground/90 cursor-pointer select-none"
                  style={{
                    ...pos,
                    background: g.color,
                    boxShadow:
                      "0 12px 24px -8px rgba(120, 80, 0, 0.25), 0 4px 8px -2px rgba(120, 80, 0, 0.15)",
                    zIndex: isOpen ? 25 : 10 + i,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.span
                        key="goal"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        className="text-sm sm:text-base leading-snug"
                      >
                        {g.goal}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-3xl text-foreground/30"
                      >
                        ?
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* iPhone showcase */}
      <section className="border-y border-border bg-gradient-to-br from-fuchsia-600 via-rose-500 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: "🧘", label: "Meditation", color: "#e879f9", custom: "habitcomb" as const, grid: [] as boolean[] },
            ...phoneWidgets,
          ].map((w, idx) => (
            <div
              key={idx}
              className="relative mx-auto w-full max-w-[220px] aspect-[9/19] rounded-[2.4rem] bg-black p-[5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
              <div
                className={`relative w-full h-full rounded-[2.05rem] overflow-hidden ${
                  "custom" in w ? "bg-black" : "bg-gradient-to-br from-rose-700 via-fuchsia-700 to-indigo-800"
                }`}
              >
                <div className="flex items-center justify-between px-5 pt-3 text-white text-[10px] font-semibold relative z-10">
                  <span>9:41</span>
                  <span>•••</span>
                </div>

                {"custom" in w && w.custom === "habitcomb" ? (
                  <HabitCombPhoneScreen />
                ) : "custom" in w && w.custom === "multi" ? (
                  <MultiHabitPhoneScreen />
                ) : (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-black/70 backdrop-blur rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${w.color}33`, color: w.color }}
                      >
                        {w.icon}
                      </div>
                      <span className="text-white text-[11px] font-semibold">{w.label}</span>
                    </div>
                    <div className="grid grid-cols-12 gap-[3px]">
                      {w.grid.map((on, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-[2px]"
                            style={{
                              background: on ? w.color : "rgba(255,255,255,0.06)",
                            }}
                          />
                      ))}
                    </div>
                    <div className="mt-2 text-center text-white/60 text-[8px] font-semibold">
                      HabitComb
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
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

      {/* BRIDGE — sticky notes become hex cells */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="text-center mb-10">
          <div className="inline-block bg-secondary rounded-full px-4 py-1.5 text-xs font-bold text-muted-foreground mb-4">
            FROM GOALS → TO HABITS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your sticky notes become <span className="text-accent">your comb</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Scroll to watch them snap into place ↓</p>
        </div>

        <div className="relative h-80 sm:h-96 max-w-5xl mx-auto">
          {/* Dotted flight path */}
          <svg
            viewBox="0 0 800 360"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 80 80 Q 200 20, 320 140 T 560 200 Q 660 240, 720 180"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>

          {/* Source sticky notes (left side) */}
          {[0, 1, 2, 3].map((i) => {
            const colors = ["#fde68a", "#fcd34d", "#fbbf24", "#fef08a"];
            const tops = ["8%", "32%", "56%", "78%"];
            const rots = [-8, 5, -4, 7];
            return (
              <motion.div
                key={`note-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: rots[i] }}
                whileInView={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0.4],
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 3,
                  times: [0, 0.15, 0.55, 0.7],
                  delay: i * 0.7,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[10px] sm:text-xs font-bold text-foreground/70 px-2 text-center"
                style={{
                  top: tops[i],
                  left: "3%",
                  background: colors[i],
                  transform: `rotate(${rots[i]}deg)`,
                  boxShadow: "0 8px 16px -6px rgba(120,80,0,0.25)",
                }}
              >
                Goal {i + 1}
              </motion.div>
            );
          })}

          {/* The bee — flies between notes and hex grid */}
          {[0, 1, 2, 3].map((i) => {
            const tops = ["8%", "32%", "56%", "78%"];
            const hexTops = ["18%", "38%", "58%", "78%"];
            return (
              <motion.div
                key={`bee-${i}`}
                initial={{ opacity: 0, top: tops[i], left: "8%" }}
                whileInView={{
                  opacity: [0, 1, 1, 1, 1, 0],
                  top: [tops[i], tops[i], tops[i], hexTops[i], hexTops[i], hexTops[i]],
                  left: ["8%", "8%", "10%", "82%", "82%", "82%"],
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 3,
                  times: [0, 0.1, 0.2, 0.6, 0.7, 0.8],
                  delay: i * 0.7 + 0.2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="absolute z-20 text-3xl sm:text-4xl"
                style={{ filter: "drop-shadow(0 4px 6px rgba(120,80,0,0.3))" }}
              >
                <motion.span
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  className="inline-block"
                >
                  🐝
                </motion.span>
              </motion.div>
            );
          })}

          {/* Hex cells dropping into the comb (right side) */}
          <div className="absolute right-4 sm:right-8 top-0 bottom-0 flex flex-col justify-around py-4">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`hex-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{
                  scale: [0, 0, 0, 1.3, 1, 1],
                  opacity: [0, 0, 0, 1, 1, 1],
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 3,
                  times: [0, 0.55, 0.6, 0.65, 0.75, 1],
                  delay: i * 0.7 + 0.2,
                  ease: "backOut",
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="w-14 h-16 sm:w-16 sm:h-[72px]"
                style={{
                  background: ["#fde68a", "#fcd34d", "#fbbf24", "#fef08a"][i],
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  boxShadow: "0 6px 14px -6px rgba(120,80,0,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2 text-center text-2xl text-muted-foreground"
        >
          ↓
        </motion.div>
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

function HabitCombPhoneScreen() {
  const habits = [
    { name: "WORKOUTS", icon: "🏋️", color: "#a78bfa", ticked: new Set([0,1,2,4,5,6,7,10,11,13,14,15,17,20,21,22]) },
    { name: "CODING", icon: "💻", color: "#f87171", ticked: new Set([0,1,3,4,5,7,8,10,11,12,14,15,16,17,20,22,23]) },
  ];
  const SIZE = 6;
  const HEX_W = Math.sqrt(3) * SIZE;
  const HEX_H = 2 * SIZE;
  const ROW_STEP = 1.5 * SIZE;
  const COLS = 10;
  const ROWS = 3;
  const svgW = HEX_W * COLS + HEX_W / 2 + 2;
  const svgH = ROW_STEP * (ROWS - 1) + HEX_H + 2;

  const hexPath = (cx: number, cy: number, s: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 90);
      pts.push(`${(cx + s * Math.cos(a)).toFixed(2)},${(cy + s * Math.sin(a)).toFixed(2)}`);
    }
    return `M${pts.join(" L")} Z`;
  };

  return (
    <div className="absolute inset-0 pt-8 px-3 flex flex-col gap-3 bg-black">
      {/* App header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-white">
          <span className="text-[10px]">⚙️</span>
          <span className="font-extrabold text-[13px] tracking-tight">Habit</span>
          <div className="flex gap-[2px]">
            {["C", "O", "M", "B"].map((l) => (
              <span
                key={l}
                className="w-3.5 h-3.5 rounded-full border border-violet-400 text-violet-400 text-[7px] font-bold flex items-center justify-center"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-white/80">
          <span className="text-[9px]">⬢</span>
          <div className="w-4 h-4 rounded border border-white/40 flex items-center justify-center text-[9px]">+</div>
        </div>
      </div>

      {/* Habit cards */}
      <div className="flex flex-col gap-2.5">
        {habits.map((h) => (
          <div
            key={h.name}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[12px]"
                style={{ background: `${h.color}22` }}
              >
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-extrabold text-[10px] tracking-wide">
                  {h.name}
                </div>
                <div className="text-white/50 text-[7px] font-semibold tracking-wider">
                  {h.ticked.size}/30 DAYS COMPLETED
                </div>
              </div>
              <div
                className="px-1.5 py-0.5 rounded-full border text-[6px] font-bold tracking-wider"
                style={{ borderColor: h.color, color: h.color }}
              >
                LOG ACTIVITY
              </div>
            </div>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto block">
              {Array.from({ length: ROWS }).map((_, rowIdx) => {
                const rowOffset = rowIdx % 2 === 1 ? HEX_W / 2 : 0;
                const cy = 1 + SIZE + rowIdx * ROW_STEP;
                return Array.from({ length: COLS }).map((_, i) => {
                  const idx = rowIdx * COLS + i;
                  const isTicked = h.ticked.has(idx);
                  const cx = 1 + HEX_W / 2 + rowOffset + i * HEX_W;
                  return (
                    <path
                      key={`${rowIdx}-${i}`}
                      d={hexPath(cx, cy, SIZE - 0.5)}
                      fill={h.color}
                      opacity={isTicked ? 1 : 0.18}
                    />
                  );
                });
              })}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function MultiHabitPhoneScreen() {
  const habits = [
    { name: "Running", icon: "🏃", color: "#34d399", ticked: new Set([0,1,2,4,5,6,8,9,10,11,13,14,15,17,18,19,20,22,23,24,26,27,28]) },
    { name: "Meditation", icon: "🧘", color: "#c084fc", ticked: new Set([0,1,3,4,6,7,8,10,11,13,14,15,16,18,20,21,22,24,25,27]) },
    { name: "Hydrate", icon: "💧", color: "#38bdf8", ticked: new Set([0,1,2,3,5,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,25,26,27,28]) },
    { name: "Sleep 8h", icon: "🌙", color: "#fb923c", ticked: new Set([0,2,3,4,6,7,9,10,11,13,14,15,17,18,20,21,22,24,25,27]) },
  ];
  const SIZE = 5;
  const HEX_W = Math.sqrt(3) * SIZE;
  const HEX_H = 2 * SIZE;
  const ROW_STEP = 1.5 * SIZE;
  const COLS = 10;
  const ROWS = 3;
  const svgW = HEX_W * COLS + HEX_W / 2 + 2;
  const svgH = ROW_STEP * (ROWS - 1) + HEX_H + 2;

  const hexPath = (cx: number, cy: number, s: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 90);
      pts.push(`${(cx + s * Math.cos(a)).toFixed(2)},${(cy + s * Math.sin(a)).toFixed(2)}`);
    }
    return `M${pts.join(" L")} Z`;
  };

  return (
    <div className="absolute inset-0 pt-8 px-3 flex flex-col gap-2 bg-black overflow-hidden">
      <div className="flex items-center justify-between px-1 mb-0.5">
        <div className="flex items-center gap-1.5 text-white">
          <span className="font-extrabold text-[12px] tracking-tight">Habit</span>
          <div className="flex gap-[2px]">
            {["C","O","M","B"].map((l) => (
              <span key={l} className="w-3 h-3 rounded-full border border-violet-400 text-violet-400 text-[6px] font-bold flex items-center justify-center">
                {l}
              </span>
            ))}
          </div>
        </div>
        <span className="text-white/50 text-[8px] font-bold">Week 16</span>
      </div>

      <div className="flex flex-col gap-1.5 overflow-hidden">
        {habits.map((h) => (
          <div key={h.name} className="rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px]" style={{ background: `${h.color}22` }}>
                  {h.icon}
                </div>
                <span className="text-white font-extrabold text-[8px] tracking-wide">{h.name}</span>
              </div>
              <span className="text-[6px] font-bold" style={{ color: h.color }}>{h.ticked.size}/30</span>
            </div>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto block">
              {Array.from({ length: ROWS }).map((_, rowIdx) => {
                const rowOffset = rowIdx % 2 === 1 ? HEX_W / 2 : 0;
                const cy = 1 + SIZE + rowIdx * ROW_STEP;
                return Array.from({ length: COLS }).map((_, i) => {
                  const idx = rowIdx * COLS + i;
                  const isTicked = h.ticked.has(idx);
                  const cx = 1 + HEX_W / 2 + rowOffset + i * HEX_W;
                  return (
                    <path
                      key={`${rowIdx}-${i}`}
                      d={hexPath(cx, cy, SIZE - 0.5)}
                      fill={h.color}
                      opacity={isTicked ? 1 : 0.15}
                    />
                  );
                });
              })}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
