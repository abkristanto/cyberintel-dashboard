import { useEffect, useState } from "react";
import { Api } from "../../lib/api";
import type { Article, TagCount, SourceCount } from "../../types/api";
import ArticleCard from "../../components/ArticleCard";
import TagBar from "../../components/charts/TagBar";
import SourceBar from "../../components/charts/SourceBar";

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<TagCount[]>([]);
  const [sources, setSources] = useState<SourceCount[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    Api.tags(7).then(r => setTags(r.tags)).catch(console.error);
    Api.sources(30).then(r => setSources(r.sources)).catch(console.error);
  }, []);

  useEffect(() => {
    const load = async () => {
      if (activeTag) {
        const r = await Api.byTag(activeTag, 30);
        setArticles(r.articles);
      } else {
        const r = await Api.latest(30);
        setArticles(r.articles);
      }
    };
    load().catch(console.error);
  }, [activeTag]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {activeTag ? `Latest: ${activeTag}` : "Latest Articles"}
          </h2>
          {activeTag && (
            <button onClick={() => setActiveTag(null)} className="text-sm text-blue-400 hover:underline">
              Clear filter
            </button>
          )}
        </div>
        <div className="grid gap-4">
          {articles.map(a => <ArticleCard key={a.id ?? a.link} a={a} onTagClick={setActiveTag} />)}
        </div>
      </section>

      <aside className="lg:col-span-1 space-y-4">
        <div className="bg-[#111827] rounded-2xl p-4 border border-white/5">
          <h3 className="text-sm font-semibold mb-3">Top Tags (7d)</h3>
          <TagBar data={tags} onBarClick={(tag) => setActiveTag(tag)} />
        </div>

        <div className="bg-[#111827] rounded-2xl p-4 border border-white/5">
          <h3 className="text-sm font-semibold mb-3">Top Sources (30d)</h3>
          <SourceBar data={sources} />
        </div>
      </aside>
    </div>
  );
}
