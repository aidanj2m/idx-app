import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';
import { Bed, Bath, Maximize } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { mlsId, property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url || '/placeholder-property.jpg';

  return (
    <Link
      href={`/property/${mlsId}`}
      className="group block bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-stone-100"
    >
      <div className="relative h-52 bg-stone-100 overflow-hidden">
        {photos && photos.length > 0 ? (
          <Image
            src={imageUrl}
            alt={address?.full || 'Property'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-xl font-bold text-white drop-shadow-md">
            {formatPrice(listPrice?.price)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[13px] text-stone-500 mb-3 truncate">
          {address?.full || 'Address unavailable'}
          {address?.city ? `, ${address.city}` : ''} {address?.state} {address?.postalCode}
        </p>

        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[13px] text-stone-600">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Bed className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            {details.bedrooms || 0} Beds
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Bath className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            {(details.bathsFull || 0) + (details.bathsHalf || 0) * 0.5} Baths
          </span>
          {details.area && (
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Maximize className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              {formatNumber(details.area)} ft²
            </span>
          )}
        </div>

        {details.yearBuilt && (
          <p className="text-[12px] text-stone-400 mt-2">Built {details.yearBuilt}</p>
        )}
      </div>
    </Link>
  );
};
