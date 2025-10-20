import { useState } from "react";
import { Search, Shield, Cpu } from "lucide-react";
import clsx from "clsx";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";

export default function TopNav() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { results, loading } = useDebouncedSearch(query);


  return (
    <header className="sticky top-0 z-20 bg-[#0D1117]/80 backdrop-blur-xl border-b border-white/10 supports-[backdrop-filter]:bg-[#0D1117]/70 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 group cursor-pointer select-none">
          <div className="p-1.5 rounded-lg bg-cyber/10 group-hover:bg-cyber/20 transition-colors">
            <Shield className="w-5 h-5 text-cyber group-hover:text-cyan-400 transition-colors" />
          </div>
          <h1 className="font-display text-xl font-semibold tracking-tight text-cyber group-hover:text-cyan-400 transition-colors">
            CyberIntel
          </h1>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div
          className={clsx(
            "relative flex items-center transition-all duration-300 ease-in-out",
            focused ? "w-[26rem]" : "w-[14rem]"
          )}
        >
          <Search
            className={clsx(
              "absolute left-3 w-4 h-4 transition-all duration-300 pointer-events-none",
              focused
                ? "text-cyber scale-110"
                : "text-gray-500 scale-100",
              loading && "animate-spin-slow text-cyber"
            )}
          />

          <input
            type="text"
            placeholder="Search intelligence..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)} // small delay so clicks register
            className={clsx(
              "bg-[#0A0F1C] text-gray-200 placeholder:text-gray-600 rounded-xl px-3 py-2 pl-9 outline-none ring-1 transition-all duration-500 font-sans text-sm tracking-tight",
              focused
                ? "ring-cyber/70 shadow-[0_0_15px_rgba(0,198,255,0.25)] w-full"
                : "ring-transparent w-full"
            )}
          />

          {/* Animated scan line */}
          <div
            className={clsx(
              "absolute bottom-0 left-2 right-2 h-[1px] overflow-hidden rounded-full transition-opacity duration-300",
              focused || loading ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber to-transparent animate-scan" />
          </div>

          {/* Dropdown results */}
          {focused && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-[#0D1117]/95 border border-white/10 rounded-xl shadow-lg backdrop-blur-xl overflow-hidden max-h-80 overflow-y-auto z-50 transition-opacity duration-200 animate-fadeIn">
              {results.map((a) => (
                <div
                  key={a.id}
                  onMouseDown={(e) => {
                    e.preventDefault(); // stop focus loss from killing link
                    window.open(a.link, "_blank", "noopener,noreferrer");
                    setFocused(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyber/10 hover:text-cyber cursor-pointer transition"
                >
                  <div className="font-medium line-clamp-1">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.source}</div>
                </div>
              ))}

              <div className="border-t border-white/10 text-center text-xs text-gray-500 py-2">
                Showing top {results.length} matches
              </div>
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="ml-4 flex items-center gap-1 text-xs text-gray-400 font-mono">
          <Cpu
            className={clsx(
              "w-3.5 h-3.5",
              focused ? "text-cyber animate-pulse" : "text-gray-500"
            )}
          />
          <span>{focused ? "scanning" : "idle"}</span>
        </div>
      </div>
    </header>
  );
}
