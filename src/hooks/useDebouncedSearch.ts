import { useEffect, useState } from "react";
import { Api } from "../lib/api";
import type { Article } from "../types/api";

export function useDebouncedSearch(query: string, delay = 400) {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await Api.search(query);
        setResults(res.articles || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, delay]);

  return { results, loading };
}
