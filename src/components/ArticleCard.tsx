import TagChip from "./TagChip";

export default function ArticleCard({ a, onTagClick }: { a: any; onTagClick?: (tag:string)=>void }) {
  return (
    <article className="bg-[#0D1117] rounded-2xl p-5 border border-white/10 shadow-sm hover:shadow-cyber/30 transition-all duration-200">
        <a href={a.link} target="_blank" rel="noreferrer" className="group block">
            <h3 className="font-mono text-[15px] font-semibold text-gray-100 group-hover:text-cyber transition-colors">
            {a.title}
            </h3>
        </a>
        <div className="font-mono mt-1 text-xs text-gray-500 tracking-tight">
            {a.source} · {a.published_at ? new Date(a.published_at).toLocaleString() : "Unknown"}
        </div>
        <p className="font-sans mt-3 text-sm leading-relaxed text-gray-300 line-clamp-3">
            {a.digest_summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
            {a.tags?.map((t: string) => (
            <TagChip key={t} tag={t} onClick={() => onTagClick?.(t)} />
            ))}
        </div>
        </article>

  );
}
