import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SourceCount } from "../../types/api";

export default function SourceBar({ data }: { data: SourceCount[] }) {
  // display all sources, sorted by count descending
  const sorted = [...data].sort((a, b) => b.count - a.count);
  const palette = [
    "#00C6FF",
    "#34d399",
    "#a78bfa",
    "#f472b6",
    "#f59e0b",
    "#60a5fa",
    "#38bdf8",
    "#f87171",
  ];

  return (
    <div
      className="rounded-2xl bg-gradient-to-b from-[#0A0F1C] to-[#0D1117] border border-white/5 p-4 shadow-inner overflow-x-auto"
      style={{ height: `${Math.max(300, sorted.length * 36)}px` }} // dynamic height
    >
      <h3 className="font-display text-gray-200 mb-3 text-sm tracking-tight">
        Sources Activity (30 Days)
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          margin={{ top: 10, left: 20, right: 20, bottom: 40 }}
          barSize={18}
        >
          {/* 📊 Source names on X-axis with line breaks */}
          <XAxis
            dataKey="source"
            interval={0} // show all
            tickLine={false}
            axisLine={false}
            tick={({ x, y, payload }) => {
              // custom tick that allows word-wrap
              const words = payload.value.split(" ");
              return (
                <text
                  x={x}
                  y={y + 10}
                  textAnchor="middle"
                  fill="#d1d5db"
                  fontSize="11"
                  fontFamily="IBM Plex Mono"
                >
                  {words.map((w: string, i: number) => (
                    <tspan
                      key={i}
                      x={x}
                      dy={i === 0 ? 0 : 12} // spacing between lines
                    >
                      {w}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          <YAxis
            stroke="#6b7280"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          {/* 🧩 Unified tooltip design */}
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              background: "rgba(10,15,28,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              color: "#e5e7eb",
              backdropFilter: "blur(8px)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              lineHeight: "1.4",
              padding: "8px 12px",
            }}
            labelStyle={{
              color: "#9ca3af",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "12px",
            }}
            itemStyle={{
              color: "#00C6FF",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
            }}
            formatter={(value: number) => [`${value.toLocaleString()} articles`, "Count"]}
          />

          {/* 📈 Bars with hover animation */}
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {sorted.map((_, i) => (
              <Cell
                key={i}
                fill={palette[i % palette.length]}
                className="cursor-pointer transition-transform duration-200 hover:scale-y-[1.05] hover:brightness-110"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
