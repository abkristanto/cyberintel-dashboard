import { apiGet } from "./fetch";
import type { Article, TagCount, SourceCount } from "../types/api";

export const Api = {
  latest: (limit = 30) =>
    apiGet<{ articles: Article[] }>("/articles/latest", { limit }),

  byTag: (tag: string, limit = 50) =>
    apiGet<{ tag: string; articles: Article[] }>(
      `/articles/by_tag/${encodeURIComponent(tag)}`,
      { limit }
    ),

  tags: (days = 7) =>
    apiGet<{ period_days: number; tags: TagCount[] }>("/stats/tags", { days }),

  sources: (days = 30) =>
    apiGet<{ sources: SourceCount[] }>("/stats/sources", { days }),
  
  search: (query: string, limit = 25) =>
    apiGet<{ query: string; articles: Article[] }>("/articles/search", {
        q: query,
        limit,
    }),
};
