// src/components/TagChip.tsx
import { getTagColorSet } from "../styles/tagColors";
import clsx from "clsx";

export default function TagChip({
  tag,
  onClick,
}: { tag: string; onClick?: () => void }) {
  const { text, bg, border, glow, hoverBg } = getTagColorSet(tag);

  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-xs px-2 py-1 rounded-full font-mono font-medium",
        "transition transform hover:scale-[1.05] active:scale-[0.97]",
        "backdrop-blur-sm hover:cursor-pointer"
      )}
      style={{
        color: text,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        boxShadow: `0 0 6px ${glow}`,
      }}
      onMouseEnter={(e) => ((e.currentTarget.style.backgroundColor = hoverBg))}
      onMouseLeave={(e) => ((e.currentTarget.style.backgroundColor = bg))}
      title={tag}
    >
      {tag}
    </button>
  );
}
