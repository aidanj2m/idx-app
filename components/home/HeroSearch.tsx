'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FilterBar } from './FilterBar';

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      // If query looks like a number, treat as MLS ID
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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search property address or MLS number"
          className="w-full px-6 py-4 pr-28 rounded-full text-lg bg-zinc-900 text-white placeholder-gray-500 border border-zinc-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
        >
          Search
        </button>
      </div>
      <FilterBar filters={filters} onChange={setFilters} />
    </form>
  );
}
