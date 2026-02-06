'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/types/property';
import { propertyApi } from '@/lib/api/propertyApi';
import { PropertyCard } from '@/components/properties/PropertyCard';

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await propertyApi.getProperties({ limit: 4 });
        setProperties(response.properties.slice(0, 4));
      } catch {
        // Silently fail — featured section is not critical
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-zinc-900 rounded-lg h-72 animate-pulse" />
        ))}
      </div>
    );
  }

  if (properties.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.mlsId} property={property} />
      ))}
    </div>
  );
}
