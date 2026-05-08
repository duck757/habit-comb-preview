export function HabitAppScreen() {
  const hexColors: Record<number, string> = {
    0: "#2dd4bf",
    1: "#a855f7",
    3: "#ec4899",
    5: "#2dd4bf",
    8: "#ef4444",
    9: "#a855f7",
  };

  const icons: Record<number, string> = {
    0: "💧",
    1: "✦",
    3: "📖",
    4: "🧘",
    5: "</>",
    6: "🌙",
    7: "🌿",
    8: "⚡",
    9: "💡",
    10: "♪",
  };

  const COLS = 4;
  const ROWS = 3;
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i);

  const calDays = [
    { d: 25, prev: true }, { d: 26, prev: true }, { d: 27, prev: true },
    { d: 28, prev: true }, { d: 29, prev: true }, { d: 30, prev: true }, { d: 31, prev: true },
    { d: 1 }, { d: 2, dot: true }, { d: 3 }, { d: 4, dot: true }, { d: 5 }, { d: 6 }, { d: 7 },
    { d: 8, dot: true }, { d: 9, dot: true }, { d: 10 }, { d: 11, dot: true }, { d: 12 }, { d: 13 }, { d: 14, today: true },
    { d: 15 }, { d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 },
  ];

  const habits = [
    { icon: "💧", color: "#2dd4bf", name: "Hydration Goal", sub: "8/8 GLASSES COMPLETED", check: "#2dd4bf" },
    { icon: "⚡", color: "#ef4444", name: "HIIT Circuit", sub: "SESSION LOGGED AT 7:15 AM", check: "#ef4444" },
    { icon: "✦", color: "#a855f7", name: "Morning Reflection", sub: "COMPLETED AT 6:45 AM", check: "#a855f7" },
  ];

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{
        background: "#0d0d0d",
        fontSize: "10px",
        scrollbarWidth: "none",
      }}
    >
      <div className="px-3 pt-2 pb-4">
        {/* Streak */}
        <div className="text-[7px] font-bold tracking-widest mb-0.5" style={{ color: "#555" }}>
          CURRENT STREAK
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-white font-extrabold" style={{ fontSize: "22px", lineHeight: 1 }}>14</span>
          <span className="text-white font-bold text-[9px] tracking-widest">DAYS</span>
        </div>
        <p className="text-[7px] leading-relaxed mb-3" style={{ color: "#888" }}>
          Your hive is flourishing. 4 habits completed<br />today. Keep the kinetic energy moving.
        </p>

        {/* Hex grid */}
        <div className="mb-4">
          {Array.from({ length: ROWS }).map((_, row) => (
            <div
              key={row}
              className="flex"
              style={{
                marginLeft: row % 2 === 1 ? "10px" : "0px",
                marginBottom: "2px",
              }}
            >
              {Array.from({ length: COLS }).map((_, col) => {
                const idx = row * COLS + col;
                const color = hexColors[idx];
                const icon = icons[idx];
                return (
                  <div
                    key={col}
                    className="flex items-center justify-center"
                    style={{
                      width: "38px",
                      height: "38px",
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: color ?? "#1e1e1e",
                      marginRight: "3px",
                      fontSize: "11px",
                    }}
                  >
                    {icon && (
                      <span style={{ fontSize: color ? "10px" : "9px", color: color ? "#fff" : "#444" }}>
                        {icon}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Beehive Activity Calendar */}
        <div
          className="rounded-xl p-2 mb-3"
          style={{ background: "#161616" }}
        >
          <div className="text-[6px] font-bold tracking-widest mb-1" style={{ color: "#2dd4bf" }}>
            BEEHIVE ACTIVITY
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-[10px]">September 2024</span>
            <div className="flex gap-1">
              <span style={{ color: "#555", fontSize: "9px" }}>‹</span>
              <span style={{ color: "#555", fontSize: "9px" }}>›</span>
            </div>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {["SU","MO","TU","WE","TH","FR","SA"].map(d => (
              <div key={d} className="text-center font-semibold" style={{ color: "#555", fontSize: "6px" }}>{d}</div>
            ))}
          </div>
          {/* Weeks */}
          {Array.from({ length: 4 }).map((_, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {calDays.slice(wi * 7, wi * 7 + 7).map((day, di) => (
                <div key={di} className="flex flex-col items-center py-0.5">
                  <span
                    className="w-4 h-4 flex items-center justify-center rounded-full font-semibold"
                    style={{
                      fontSize: "7px",
                      background: day.today ? "#2dd4bf" : "transparent",
                      color: day.today ? "#000" : day.prev ? "#333" : day.dot ? "#2dd4bf" : "#ccc",
                    }}
                  >
                    {day.d}
                  </span>
                  {day.dot && !day.today && (
                    <div className="w-0.5 h-0.5 rounded-full mt-0.5" style={{ background: "#2dd4bf" }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Habit items */}
        <div className="flex flex-col gap-2">
          {habits.map((h) => (
            <div
              key={h.name}
              className="flex items-center gap-2 rounded-xl px-2 py-2"
              style={{ background: "#161616" }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${h.color}22` }}
              >
                <span style={{ fontSize: "9px" }}>{h.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold truncate" style={{ fontSize: "8px" }}>{h.name}</div>
                <div className="truncate" style={{ fontSize: "6px", color: "#555" }}>{h.sub}</div>
              </div>
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: `1.5px solid ${h.check}` }}
              >
                <span style={{ fontSize: "7px", color: h.check }}>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
