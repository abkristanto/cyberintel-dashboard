export type Article = {
  id: number;
  source: string;
  title: string;
  link: string;
  tags: string[];
  digest_summary: string;
  published_at: string | null; // ISO string or null
};

export type TagCount = { tag: string; count: number };
export type SourceCount = { source: string; count: number };
