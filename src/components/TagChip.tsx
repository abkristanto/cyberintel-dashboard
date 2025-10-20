export default function TagChip({ tag, onClick }: { tag: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-200 hover:bg-blue-600 hover:text-white transition"
    >
      {tag}
    </button>
  );
}
