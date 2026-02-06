'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Property } from '@/lib/types/property';
import { propertyApi } from '@/lib/api/propertyApi';
import { searchParamsToFilters } from '@/lib/utils/searchParams';
import { MapView } from '@/components/search/MapView';
import { PropertySidebar } from '@/components/search/PropertySidebar';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<number | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const filters = searchParamsToFilters(searchParams);
      const response = await propertyApi.getProperties(filters);
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
    <div className="flex h-[calc(100vh-4rem)] pt-16 overflow-hidden">
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
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[calc(100vh-4rem)] pt-16 items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
