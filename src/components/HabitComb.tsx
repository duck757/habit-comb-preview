import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Habit = {
  id: string;
  name: string;
  tag: string;
  days: boolean[];
};

const seed: Habit[] = [
  { id: "1", name: "Morning Run", tag: "5KM", days: [true, true, true, false, true, false, false] },
  { id: "2", name: "Read", tag: "20MIN", days: [true, true, true, true, true, false, false] },
  { id: "3", name: "Train", tag: "STRENGTH", days: [true, false, true, true, false, false, false] },
  { id: "4", name: "Hydrate", tag: "3L", days: [true, true, true, true, true, true, false] },
];

const dayLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function HabitComb() {
  const [habits, setHabits] = useState(seed);
  const todayIdx = 6;

  const toggle = (habitId: string, dayIdx: number) => {
    setHabits((h) =>
      h.map((x) =>
        x.id === habitId ? { ...x, days: x.days.map((d, i) => (i === dayIdx ? !d : d)) } : x,
      ),
    );
  };

  const total = habits.length * 7;
  const done = habits.reduce((s, h) => s + h.days.filter(Boolean).length, 0);
  const pct = Math.round((done / total) * 100);
  const longest = Math.max(...habits.map((h) => longestStreak(h.days)));

  return (
    <div className="bg-foreground text-background p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-background/20">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">
            Week 16 · Live
          </div>
          <div className="font-display text-5xl sm:text-6xl mt-2">{pct}<span className="text-2xl">%</span></div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">Streak</div>
          <div className="font-display text-3xl mt-2">{longest} <span className="text-sm">DAYS</span></div>
        </div>
      </div>

      {/* Day header */}
      <div className="grid grid-cols-[110px_repeat(7,minmax(0,1fr))] gap-x-1 mb-3 pl-2">
        <div />
        {dayLabels.map((d, i) => (
          <div
            key={i}
            className={`text-center text-[9px] font-bold tracking-wider ${
              i === todayIdx ? "text-background" : "text-background/40"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Habit rows — hexagonal hive */}
      <div className="space-y-2">
        {habits.map((habit, rowIdx) => (
          <div
            key={habit.id}
            className="grid grid-cols-[110px_repeat(7,minmax(0,1fr))] gap-x-1 items-center"
          >
            <div className="py-2 pr-2 min-w-0">
              <div className="font-bold text-sm truncate uppercase tracking-wide">{habit.name}</div>
              <div className="text-[10px] text-background/50 font-bold tracking-wider">{habit.tag}</div>
            </div>
            {habit.days.map((d, i) => (
              <button
                key={i}
                onClick={() => toggle(habit.id, i)}
                className="relative aspect-square group"
                style={{ transform: rowIdx % 2 === 1 ? "translateX(50%)" : undefined }}
                aria-label={`Toggle ${habit.name} ${dayLabels[i]}`}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`absolute inset-0 hex transition-colors ${
                    d ? "bg-background" : "bg-background/10 group-hover:bg-background/25"
                  }`}
                />
                {i === todayIdx && !d && (
                  <div className="absolute inset-[3px] hex bg-foreground" />
                )}
                {i === todayIdx && !d && (
                  <div className="absolute inset-[4px] hex bg-background/0 border border-background/60" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />
                )}
                <AnimatePresence>
                  {d && (
                    <motion.div
                      key="x"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                        <path d="M6 6 L18 18 M18 6 L6 18" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-background/20 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">
          Tap to log · Just do it
        </div>
        <div className="text-[10px] font-bold tracking-wider text-background/60">{done}/{total}</div>
      </div>
    </div>
  );
}

function longestStreak(days: boolean[]) {
  let max = 0;
  let cur = 0;
  for (const d of days) {
    if (d) {
      cur++;
      max = Math.max(max, cur);
    } else cur = 0;
  }
  return max;
}
