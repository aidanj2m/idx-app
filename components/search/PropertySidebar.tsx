'use client';

import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';

interface PropertySidebarProps {
  properties: Property[];
  isOpen: boolean;
  onToggle: () => void;
  hoveredPropertyId: number | null;
  onPropertyHover: (mlsId: number | null) => void;
  onPropertyClick: (mlsId: number) => void;
  loading: boolean;
}

function SidebarCard({
  property,
  isHovered,
  onHover,
  onClick,
}: {
  property: Property;
  isHovered: boolean;
  onHover: (mlsId: number | null) => void;
  onClick: (mlsId: number) => void;
}) {
  const { property: details, address, listPrice, photos } = property;
  const imageUrl = photos?.[0]?.url;

  return (
    <div
      className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 ${
        isHovered
          ? 'border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]/20'
          : 'border-zinc-800 hover:border-zinc-700 hover:shadow-md'
      }`}
      onMouseEnter={() => onHover(property.mlsId)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(property.mlsId)}
    >
      {imageUrl && (
        <div className="h-32 overflow-hidden bg-zinc-800">
          <img
            src={imageUrl}
            alt={address?.full || 'Property'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3 bg-zinc-900">
        <p className="text-base font-bold text-[#D4AF37]">
          {formatPrice(listPrice?.price)}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {address?.full || 'Address unavailable'}
        </p>
        <div className="flex gap-2 mt-1.5 text-xs text-gray-500">
          <span>{details?.bedrooms || 0} bd</span>
          <span className="text-gray-700">|</span>
          <span>{(details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5} ba</span>
          {details?.area && (
            <>
              <span className="text-gray-700">|</span>
              <span>{formatNumber(details.area)} sqft</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function PropertySidebar({
  properties,
  isOpen,
  onToggle,
  hoveredPropertyId,
  onPropertyHover,
  onPropertyClick,
  loading,
}: PropertySidebarProps) {
  return (
    <div className="relative flex">
      {/* Sidebar panel */}
      <div
        className={`bg-zinc-950 border-r border-zinc-800 transition-all duration-300 overflow-hidden ${
          isOpen ? 'w-96' : 'w-0'
        }`}
      >
        <div className="w-96 h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 shrink-0">
            <h2 className="text-lg font-semibold text-white">
              {loading ? 'Searching...' : `${properties.length} Properties`}
            </h2>
          </div>

          {/* Property list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-lg h-48 animate-pulse" />
              ))
            ) : properties.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm">No properties found</p>
              </div>
            ) : (
              properties.map((property) => (
                <SidebarCard
                  key={property.mlsId}
                  property={property}
                  isHovered={hoveredPropertyId === property.mlsId}
                  onHover={onPropertyHover}
                  onClick={onPropertyClick}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 -right-8 z-10 bg-zinc-900 w-8 h-16 rounded-r-lg shadow-md border border-l-0 border-zinc-800 flex items-center justify-center hover:bg-zinc-800 transition-colors"
      >
        <svg
          className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
