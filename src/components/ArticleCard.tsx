import { Clock, Globe2 } from "lucide-react";
import TagChip from "./TagChip";

export default function ArticleCard({
  a,
  onTagClick,
}: {
  a: any;
  onTagClick?: (tag: string) => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0F1C] to-[#0E1625] hover:from-[#0E1625] hover:to-[#112240] transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(0,198,255,0.15)]">
      {/* Cyber Accent Line */}
      <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyber via-cyan-300 to-transparent transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10 p-5">
        {/* Title */}
        <a
          href={a.link}
          target="_blank"
          rel="noreferrer"
          className="block cursor-pointer"
        >
          <h3 className="font-display text-[16px] font-semibold text-gray-100 tracking-tight group-hover:text-cyber transition-colors leading-snug">
            {a.title}
          </h3>
        </a>

        {/* Metadata */}
        <div className="flex items-center gap-3 mt-2 text-xs font-mono text-gray-500 tracking-tight">
          <div className="flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5 text-cyber/70" />
            <span>{a.source}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyber/70" />
            <span>
              {a.published_at
                ? new Date(a.published_at).toLocaleString()
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Summary */}
        <p className="font-sans mt-3 text-sm leading-relaxed text-gray-300 line-clamp-3">
          {a.digest_summary}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {a.tags?.map((t: string) => (
            <TagChip key={t} tag={t} onClick={() => onTagClick?.(t)} />
          ))}
        </div>
      </div>

      {/* Hover Glow / Cyber Pulse */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-cyber/5 blur-xl animate-pulse-slow rounded-2xl" />
      </div>
    </article>
  );
}
