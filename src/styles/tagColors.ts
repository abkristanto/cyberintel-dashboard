// src/styles/tagColors.ts
// Colors chosen for contrast on #0D1117 and consistency with your neon/cyber aesthetic.

export const TAG_COLORS: Record<string, string> = {
  // Core threat themes
  "ai":            "#00C6FF", // brand cyan (primary accent)
  "malware":       "#fb7185", // rose (urgent but distinct from ransomware)
  "ransomware":    "#f472b6", // pink (high-alert, distinct from malware)
  "phishing":      "#34d399", // emerald (social/cred themes read cleanly in green)
  "vulnerability": "#a78bfa", // violet (technical finding)
  "exploit":       "#60a5fa", // soft blue (related to vuln but separate hue)
  "data breach":   "#f59e0b", // amber (incident/outcome)
  "policy":        "#93c5fd", // light blue (governance/compliance)
  "legal":         "#22d3ee", // sky/cyan variant (courts/regulator notices)

  // Optional extensions (keep if you use these)
  "cloud":         "#22d3ee",
  "zero-day":      "#f87171",
  "supply chain":  "#c084fc",
  "mobile":        "#38bdf8",
  "windows":       "#60a5fa",
  "linux":         "#34d399",
  "macos":         "#a78bfa",
};

// Fallback color if a tag isn't in the map:
export const DEFAULT_TAG_COLOR = "#8b8b8b"; // subtle neutral (still readable)

// Utility: convert hex to rgba for translucent bg/border/glow
export function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#","").trim();
  const bigint = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Public API to get color(s) for a tag
export function getTagColor(tag?: string) {
  if (!tag) return DEFAULT_TAG_COLOR;
  const key = tag.toLowerCase();
  return TAG_COLORS[key] ?? DEFAULT_TAG_COLOR;
}

// Full trio for consistent styling on dark UI
export function getTagColorSet(tag?: string) {
  const base = getTagColor(tag);
  return {
    text: base,                         // main accent
    bg:   hexToRgba(base, 0.18),        // chip/card background tint
    border: hexToRgba(base, 0.38),      // subtle border
    glow: hexToRgba(base, 0.30),        // soft glow
    hoverBg: hexToRgba(base, 0.28),     // hover background
  };
}
