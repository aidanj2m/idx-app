'use client';

import { formatPrice } from '@/lib/utils/formatters';

interface PropertyPinProps {
  price?: number;
  isHovered: boolean;
}

export function PropertyPin({ price, isHovered }: PropertyPinProps) {
  return (
    <div
      className={`
        px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer
        transition-colors transition-shadow duration-200 whitespace-nowrap
        ${
          isHovered
            ? 'bg-blue-600 text-white shadow-lg z-10 ring-2 ring-blue-300'
            : 'bg-white text-gray-900 shadow-md border border-gray-200'
        }
      `}
    >
      {formatPrice(price)}
    </div>
  );
}
