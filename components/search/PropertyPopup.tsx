'use client';

import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';
import { Bed, Bath, Maximize } from 'lucide-react';

interface PropertyPopupProps {
  property: Property;
}

export function PropertyPopup({ property }: PropertyPopupProps) {
  const { property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url;

  return (
    <div className="w-72 bg-white rounded-xl overflow-hidden">
      {imageUrl && (
        <div className="h-40 overflow-hidden bg-stone-100 relative">
          <img
            src={imageUrl}
            alt={address?.full || 'Property'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="text-xl font-bold text-white drop-shadow-md">
              {formatPrice(listPrice?.price)}
            </span>
          </div>
        </div>
      )}
      <div className="p-3.5">
        {!imageUrl && (
          <p className="text-lg font-bold text-[#8B2332] mb-1">
            {formatPrice(listPrice?.price)}
          </p>
        )}
        <p className="text-[12px] text-stone-500 truncate">
          {address?.full || 'Address unavailable'}
        </p>
        <div className="flex gap-4 mt-2.5 text-[12px] text-stone-500">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-stone-400" />
            {details?.bedrooms || 0} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-stone-400" />
            {(details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5} baths
          </span>
          {details?.area && (
            <span className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-stone-400" />
              {formatNumber(details.area)} ft²
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
