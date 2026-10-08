'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, SlidersHorizontal, X, Heart } from 'lucide-react';
import { explorePhotos, exploreCategories } from '@/data/explore';

function Grid({ items }: { items: typeof explorePhotos }) {
  if (items.length === 0) return <p className="px-5 py-8 text-center text-sm text-gray-500">No photos match your search.</p>;
  return (
    <div className="grid grid-cols-3 gap-0.5">
      {items.map((p) => (
        <div key={p.id} className="group relative aspect-square overflow-hidden bg-gray-200">
          <img src={p.url} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-gradient-to-t from-black/60 to-transparent px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Heart className="h-3 w-3 fill-white" /> {p.likes.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortRecent, setSortRecent] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return explorePhotos.filter(
      (p) =>
        (category === 'All' || p.tags.includes(category)) &&
        (!q || p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [query, category]);

  const recent = sortRecent ? filtered : [...filtered].reverse();
  const popular = [...filtered].sort((a, b) => b.likes - a.likes);

  return (
    <div className="pb-24">
      {/* Search bar */}
      <div className="flex items-center gap-4 bg-white px-5 pb-3 pt-4">
        <button onClick={() => router.back()} aria-label="Go back" className="text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-gray-300 px-4 py-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
          {query ? (
            <button onClick={() => setQuery('')} aria-label="Clear search"><X className="h-[18px] w-[18px] text-gray-500" /></button>
          ) : (
            <Search className="h-[18px] w-[18px] text-gray-500" />
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-4 overflow-x-auto border-b border-gray-100 bg-white px-5 pb-3 text-sm [scrollbar-width:none]">
        {exploreCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap pb-1 transition-colors ${
              category === c ? 'border-b-2 border-purple-600 font-semibold text-purple-600' : 'text-gray-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <section className="bg-white pt-4">
        <div className="mb-3 flex items-center justify-between px-5">
          <h2 className="text-xl font-bold text-gray-900">Recent</h2>
          <button onClick={() => setSortRecent((s) => !s)} aria-label="Toggle order" className="text-gray-700">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
        <Grid items={recent.slice(0, 6)} />
      </section>

      <section className="mt-2 bg-white pt-4">
        <div className="mb-3 flex items-center justify-between px-5">
          <h2 className="text-xl font-bold text-gray-900">Popular</h2>
          <SlidersHorizontal className="h-5 w-5 text-gray-700" />
        </div>
        <Grid items={popular} />
      </section>
    </div>
  );
}
