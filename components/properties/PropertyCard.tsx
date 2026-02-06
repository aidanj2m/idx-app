import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const { mlsId, property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url || '/placeholder-property.jpg';

  return (
    <Link
      href={`/property/${mlsId}`}
      className="block bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#D4AF37]/50 transition-all duration-300 border border-zinc-800"
    >
      {/* Property Image */}
      <div className="relative h-48 bg-zinc-800">
        {photos && photos.length > 0 ? (
          <Image
            src={imageUrl}
            alt={address?.full || 'Property'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {formatPrice(listPrice?.price)}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <p className="text-gray-400 text-sm mb-2">
          {address?.city}, {address?.state} {address?.postalCode}
        </p>

        <div className="flex justify-between items-center text-gray-300 mb-2">
          <div className="flex space-x-4">
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {details.bedrooms || 0} Beds
            </span>
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              {(details.bathsFull || 0) + (details.bathsHalf || 0) * 0.5} Baths
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{formatNumber(details.area)} sq ft</span>
          {details.yearBuilt && <span>Built {details.yearBuilt}</span>}
        </div>

        {details.subdivision && (
          <p className="text-xs text-gray-500 mt-2 truncate">
            {details.subdivision}
          </p>
        )}
      </div>
    </Link>
  );
};
