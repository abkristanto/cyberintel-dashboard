// src/components/charts/TagBar.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getTagColor } from "../../styles/tagColors";
import type { TagCount } from "../../types/api";

export default function TagBar({ data, onBarClick }: { data: TagCount[]; onBarClick?: (tag: string) => void }) {
  const top = data.slice(0, 20);

  return (
    <div className="h-80 rounded-2xl bg-gradient-to-b from-[#0A0F1C] to-[#0D1117] border border-white/5 p-4 shadow-inner">
      <h3 className="font-display text-gray-200 mb-3 text-sm tracking-tight">Top Tags (7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={top} layout="vertical" margin={{ top: 10, left: 40, right: 10, bottom: 10 }}>
          <XAxis type="number" stroke="#6b7280" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <YAxis dataKey="tag" type="category" interval={0} tickLine={false} axisLine={false}
                 tick={{ fill: "#d1d5db", fontSize: 12, fontFamily: "IBM Plex Mono" }} width={110} />
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
          <Bar dataKey="count" radius={[6, 6, 6, 6]} onClick={(d) => onBarClick?.((d as any).tag)}>
            {top.map((row, i) => (
              <Cell key={i} fill={getTagColor(row.tag)} className="cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:brightness-110" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
