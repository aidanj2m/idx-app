'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { FilterBar } from './FilterBar';

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      if (/^\d+$/.test(query.trim())) {
        router.push(`/property/${query.trim()}`);
        return;
      }
      params.set('q', query.trim());
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
        {/* Search input row */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, neighborhood, address, or MLS #"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-stone-200 text-stone-800 placeholder-stone-400 bg-stone-50/50 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#8B2332]/20 focus:border-[#8B2332]/30 transition-all"
          />
        </div>

        {/* Filters */}
        <FilterBar filters={filters} onChange={setFilters} />

        {/* Search button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 bg-[#8B2332] text-white rounded-xl font-semibold hover:bg-[#6d1b28] transition-all hover:shadow-lg text-[15px]"
          >
            Search Properties
          </button>
        </div>
      </div>
    </form>
  );
}
