'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Property } from '@/lib/types/property';
import { propertyApi } from '@/lib/api/propertyApi';
import { searchParamsToFilters } from '@/lib/utils/searchParams';
import { PropertySidebar } from '@/components/search/PropertySidebar';
import { FilterBar } from '@/components/home/FilterBar';
import { Search } from 'lucide-react';

const MapView = dynamic(
  () => import('@/components/search/MapView').then((mod) => mod.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#8B2332] border-t-transparent" />
      </div>
    ),
  }
);

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Sync URL params to local filter state on mount
  useEffect(() => {
    const f: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key === 'q') {
        setSearchQuery(value);
      } else {
        f[key] = value;
      }
    });
    setFilters(f);
  }, [searchParams]);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const apiFilters = searchParamsToFilters(searchParams);
      const response = await propertyApi.getProperties(apiFilters);
      setProperties(response.properties);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/search?${params.toString()}`);
  }, [filters, searchQuery, router]);

  const handlePropertyClick = useCallback(
    (mlsId: number) => {
      router.push(`/property/${mlsId}`);
    },
    [router]
  );

  const handlePropertyHover = useCallback((mlsId: number | null) => {
    setHoveredPropertyId(mlsId);
  }, []);

  const handleStyleToggle = useCallback(() => {
    setMapStyle((prev) => (prev === 'streets' ? 'satellite' : 'streets'));
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] pt-[72px] overflow-hidden bg-[#fafaf9]">
      {/* Top filter bar */}
      <div className="shrink-0 bg-white border-b border-stone-200 px-4 py-3 overflow-x-auto">
        <div className="flex items-end gap-3 min-w-max">
          <div className="flex-none">
            <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-1 px-1">Search</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                placeholder="City, address, MLS #"
                className="pl-9 pr-3 py-2.5 rounded-lg border border-stone-200 bg-stone-50 text-[13px] text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B2332]/20 focus:border-[#8B2332]/30 w-[200px] transition-all"
              />
            </div>
          </div>
          <FilterBar filters={filters} onChange={setFilters} />
          <button
            onClick={applyFilters}
            className="px-6 py-2.5 bg-[#8B2332] text-white rounded-lg text-[13px] font-semibold hover:bg-[#6d1b28] transition-all hover:shadow-md shrink-0"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Main content: sidebar + map */}
      <div className="flex flex-1 overflow-hidden">
        <PropertySidebar
          properties={properties}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          hoveredPropertyId={hoveredPropertyId}
          onPropertyHover={handlePropertyHover}
          onPropertyClick={handlePropertyClick}
          loading={loading}
        />
        <div className="flex-1 relative">
          <MapView
            properties={properties}
            hoveredPropertyId={hoveredPropertyId}
            onPropertyHover={handlePropertyHover}
            onPropertyClick={handlePropertyClick}
            mapStyle={mapStyle}
            onStyleToggle={handleStyleToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[calc(100vh-72px)] pt-[72px] items-center justify-center bg-[#fafaf9]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#8B2332] border-t-transparent" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
