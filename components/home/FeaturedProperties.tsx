'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/types/property';
import { propertyApi } from '@/lib/api/propertyApi';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';

function FeaturedCard({ property }: { property: Property }) {
  const { mlsId, property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url || '/placeholder-property.jpg';

  return (
    <Link
      href={`/property/${mlsId}`}
      className="group block bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-stone-100"
    >
      <div className="relative h-48 sm:h-56 lg:h-64 bg-stone-100 overflow-hidden">
        {photos && photos.length > 0 ? (
          <Image
            src={imageUrl}
            alt={address?.full || 'Property'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4">
          <p className="text-2xl font-bold text-white drop-shadow-md">
            {formatPrice(listPrice?.price)}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#8B2332] mt-0.5 shrink-0" />
          <p className="text-[13px] text-stone-500 leading-tight truncate">
            {address?.full}{address?.city ? `, ${address.city}` : ''}
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[13px] text-stone-600">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Bed className="w-4 h-4 text-stone-400 shrink-0" />
            {details.bedrooms || 0} Beds
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Bath className="w-4 h-4 text-stone-400 shrink-0" />
            {(details.bathsFull || 0) + (details.bathsHalf || 0) * 0.5} Baths
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Maximize className="w-4 h-4 text-stone-400 shrink-0" />
            {formatNumber(details.area)} ft²
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const response = await propertyApi.getProperties({ limit: 4 });
        setProperties(response.properties.slice(0, 4));
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100">
            <div className="h-48 sm:h-56 lg:h-64 bg-stone-100 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-stone-100 rounded-lg animate-pulse w-28" />
              <div className="h-4 bg-stone-50 rounded-lg animate-pulse w-full" />
              <div className="h-4 bg-stone-50 rounded-lg animate-pulse w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {properties.map((property) => (
        <FeaturedCard key={property.mlsId} property={property} />
      ))}
    </div>
  );
}
