import { useState } from "react";
import { motion } from "framer-motion";

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

// Pointy-top hex geometry
// For a hex with "size" = circumradius (center to vertex):
//   width  = sqrt(3) * size
//   height = 2 * size
// Tightly packed: horizontal step = width, vertical step = 1.5 * size
// Odd rows are offset by width/2.
const SIZE = 26; // circumradius
const HEX_W = Math.sqrt(3) * SIZE; // ~45.03
const HEX_H = 2 * SIZE; // 52
const ROW_STEP = 1.5 * SIZE; // 39
const COLS = 7;
const PAD = 4;

function hexPath(cx: number, cy: number, s: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 90); // pointy-top
    const x = cx + s * Math.cos(angle);
    const y = cy + s * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}

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

  // SVG viewBox dimensions
  const svgW = HEX_W * COLS + HEX_W / 2 + PAD * 2;
  const svgH = ROW_STEP * (habits.length - 1) + HEX_H + PAD * 2;

  return (
    <div className="bg-foreground text-background p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 pb-6 border-b border-background/20">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">
            Week 16 · Live
          </div>
          <div className="font-display text-5xl sm:text-6xl mt-2">
            {pct}
            <span className="text-2xl">%</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">Streak</div>
          <div className="font-display text-3xl mt-2">
            {longest} <span className="text-sm">DAYS</span>
          </div>
        </div>
      </div>

      {/* Day labels — aligned to columns of row 0 (no offset) */}
      <div className="flex mb-3" style={{ paddingLeft: PAD }}>
        {dayLabels.map((d, i) => (
          <div
            key={i}
            className={`text-center text-[9px] font-bold tracking-wider ${
              i === todayIdx ? "text-background" : "text-background/40"
            }`}
            style={{ width: HEX_W }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Habit labels + Hive */}
      <div className="flex gap-4 items-start">
        <div className="flex flex-col" style={{ paddingTop: PAD }}>
          {habits.map((habit, rowIdx) => (
            <div
              key={habit.id}
              className="flex flex-col justify-center"
              style={{
                height: rowIdx === habits.length - 1 ? HEX_H : ROW_STEP,
              }}
            >
              <div className="font-bold text-xs uppercase tracking-wide whitespace-nowrap">
                {habit.name}
              </div>
              <div className="text-[9px] text-background/50 font-bold tracking-wider">
                {habit.tag}
              </div>
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="flex-1 w-full h-auto overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {habits.map((habit, rowIdx) => {
            const rowOffset = rowIdx % 2 === 1 ? HEX_W / 2 : 0;
            const cy = PAD + SIZE + rowIdx * ROW_STEP;
            return habit.days.map((d, i) => {
              const cx = PAD + HEX_W / 2 + rowOffset + i * HEX_W;
              const isToday = i === todayIdx;
              return (
                <g
                  key={`${habit.id}-${i}`}
                  onClick={() => toggle(habit.id, i)}
                  className="cursor-pointer"
                >
                  <motion.path
                    d={hexPath(cx, cy, SIZE - 1.5)}
                    fill={d ? "var(--color-background)" : "rgba(255,255,255,0.08)"}
                    stroke="var(--color-foreground)"
                    strokeWidth={2}
                    whileHover={{ opacity: 0.85 }}
                    whileTap={{ scale: 0.92, originX: cx / svgW, originY: cy / svgH }}
                    style={{ transformBox: "fill-box", transformOrigin: `${cx}px ${cy}px` }}
                  />
                  {isToday && !d && (
                    <path
                      d={hexPath(cx, cy, SIZE - 5)}
                      fill="none"
                      stroke="var(--color-background)"
                      strokeWidth={1}
                      opacity={0.7}
                    />
                  )}
                  {d && (
                    <g
                      stroke="var(--color-foreground)"
                      strokeWidth={2.5}
                      strokeLinecap="square"
                    >
                      <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} />
                      <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} />
                    </g>
                  )}
                </g>
              );
            });
          })}
        </svg>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-background/20 flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-background/60">
          Tap to log · Just do it
        </div>
        <div className="text-[10px] font-bold tracking-wider text-background/60">
          {done}/{total}
        </div>
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
