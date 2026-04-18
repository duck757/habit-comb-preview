import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Habit = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  // 7 days, true = logged
  days: boolean[];
};

const seed: Habit[] = [
  { id: "1", name: "Morning Run", emoji: "🏃", color: "oklch(0.78 0.19 75)", days: [true, true, true, false, true, false, false] },
  { id: "2", name: "Read 20 min", emoji: "📚", color: "oklch(0.7 0.18 50)", days: [true, true, true, true, true, false, false] },
  { id: "3", name: "Meditate", emoji: "🧘", color: "oklch(0.82 0.16 95)", days: [true, false, true, true, false, false, false] },
  { id: "4", name: "Drink Water", emoji: "💧", color: "oklch(0.75 0.15 65)", days: [true, true, true, true, true, true, false] },
];

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export function HabitComb() {
  const [habits, setHabits] = useState(seed);
  const [pulseId, setPulseId] = useState<string | null>(null);

  const todayIdx = 6; // sunday

  const toggle = (habitId: string, dayIdx: number) => {
    setHabits((h) =>
      h.map((x) =>
        x.id === habitId ? { ...x, days: x.days.map((d, i) => (i === dayIdx ? !d : d)) } : x,
      ),
    );
    setPulseId(`${habitId}-${dayIdx}`);
    setTimeout(() => setPulseId(null), 600);
  };

  const completionPct = Math.round(
    (habits.reduce((sum, h) => sum + h.days.filter(Boolean).length, 0) /
      (habits.length * 7)) *
      100,
  );

  return (
    <div className="rounded-3xl border bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-honey">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live preview · this week
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mt-1">Tap a cell to log</h3>
        </div>
        <div className="text-right shrink-0">
          <div className="text-4xl font-bold text-gradient-honey">{completionPct}%</div>
          <div className="text-xs text-muted-foreground">comb filled</div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-x-3 sm:gap-x-6 gap-y-4 items-center">
        <div />
        <div className="flex gap-1.5 sm:gap-2">
          {dayLabels.map((d, i) => (
            <div
              key={i}
              className={`w-8 sm:w-10 text-center text-[10px] sm:text-xs font-semibold ${
                i === todayIdx ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {habits.map((habit) => (
          <Row
            key={habit.id}
            habit={habit}
            todayIdx={todayIdx}
            pulseKey={pulseId}
            onToggle={(i) => toggle(habit.id, i)}
          />
        ))}
      </div>

      <div className="mt-6 pt-5 border-t flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          🔥 Longest streak:{" "}
          <span className="font-semibold text-foreground">
            {Math.max(...habits.map((h) => longestStreak(h.days)))} days
          </span>
        </span>
        <span className="text-muted-foreground hidden sm:block">Synced just now</span>
      </div>
    </div>
  );
}

function Row({
  habit,
  todayIdx,
  pulseKey,
  onToggle,
}: {
  habit: Habit;
  todayIdx: number;
  pulseKey: string | null;
  onToggle: (i: number) => void;
}) {
  return (
    <>
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 hex flex-shrink-0 grid place-items-center text-lg"
          style={{ background: habit.color }}
        >
          {habit.emoji}
        </div>
        <div className="font-semibold truncate">{habit.name}</div>
      </div>
      <div className="flex gap-1.5 sm:gap-2">
        {habit.days.map((done, i) => {
          const id = `${habit.id}-${i}`;
          const isToday = i === todayIdx;
          return (
            <button
              key={i}
              onClick={() => onToggle(i)}
              className="relative w-8 h-9 sm:w-10 sm:h-11 grid place-items-center group"
              aria-label={`Toggle ${habit.name} day ${i + 1}`}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.08 }}
                className="absolute inset-0 hex transition-all"
                style={{
                  background: done ? habit.color : "oklch(0.93 0.02 85)",
                  boxShadow: done ? "0 4px 12px -4px oklch(0.6 0.18 70 / 0.5)" : "none",
                  outline: isToday ? "2px solid oklch(0.7 0.19 45)" : "none",
                  outlineOffset: "-3px",
                }}
              />
              <AnimatePresence>
                {done && (
                  <motion.svg
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="relative w-4 h-4 text-foreground"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="5 12 10 17 19 7" />
                  </motion.svg>
                )}
              </AnimatePresence>
              {pulseKey === id && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 hex pointer-events-none"
                  style={{ background: habit.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
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
