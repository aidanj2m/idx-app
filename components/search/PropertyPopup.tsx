'use client';

import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';

interface PropertyPopupProps {
  property: Property;
}

export function PropertyPopup({ property }: PropertyPopupProps) {
  const { property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url;

  return (
    <div className="w-64 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      {imageUrl && (
        <div className="h-36 overflow-hidden bg-zinc-800">
          <img
            src={imageUrl}
            alt={address?.full || 'Property'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <p className="text-lg font-bold text-[#D4AF37]">
          {formatPrice(listPrice?.price)}
        </p>
        <p className="text-sm text-gray-400 mt-1 truncate">
          {address?.full || 'Address unavailable'}
        </p>
        <div className="flex gap-3 mt-2 text-xs text-gray-500">
          <span>{details?.bedrooms || 0} beds</span>
          <span>{(details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5} baths</span>
          {details?.area && <span>{formatNumber(details.area)} sqft</span>}
        </div>
      </div>
    </div>
  );
}
