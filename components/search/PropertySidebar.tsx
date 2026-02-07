'use client';

import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';
import { Bed, Bath, Maximize, ChevronLeft } from 'lucide-react';

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
      className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-200 bg-white ${
        isHovered
          ? 'border-[#8B2332]/40 shadow-[0_4px_20px_rgba(139,35,50,0.12)] scale-[1.01]'
          : 'border-stone-100 hover:border-stone-200 hover:shadow-md'
      }`}
      onMouseEnter={() => onHover(property.mlsId)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(property.mlsId)}
    >
      {imageUrl && (
        <div className="h-36 overflow-hidden bg-stone-100 relative">
          <img
            src={imageUrl}
            alt={address?.full || 'Property'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-2.5 left-3">
            <span className="text-lg font-bold text-white drop-shadow-md">
              {formatPrice(listPrice?.price)}
            </span>
          </div>
        </div>
      )}
      {!imageUrl && (
        <div className="px-3.5 pt-3.5">
          <p className="text-lg font-bold text-[#8B2332]">
            {formatPrice(listPrice?.price)}
          </p>
        </div>
      )}
      <div className="p-3.5">
        <p className="text-[12px] text-stone-500 truncate mb-2">
          {address?.full || 'Address unavailable'}
        </p>
        <div className="flex gap-3 text-[12px] text-stone-500">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-stone-400" />
            {details?.bedrooms || 0} bd
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-stone-400" />
            {(details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5} ba
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
        className={`bg-[#fafaf9] border-r border-stone-200 transition-all duration-300 overflow-hidden ${
          isOpen ? 'w-[380px]' : 'w-0'
        }`}
      >
        <div className="w-[380px] h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-stone-100 shrink-0">
            <p className="text-[13px] font-medium text-stone-800">
              {loading ? 'Searching...' : `${properties.length} Properties Found`}
            </p>
          </div>

          {/* Property list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                  <div className="h-36 bg-stone-100 animate-pulse" />
                  <div className="p-3.5 space-y-2">
                    <div className="h-3 bg-stone-100 rounded-lg animate-pulse w-3/4" />
                    <div className="h-3 bg-stone-50 rounded-lg animate-pulse w-1/2" />
                  </div>
                </div>
              ))
            ) : properties.length === 0 ? (
              <div className="text-center py-16 text-stone-400">
                <p className="text-[13px]">No properties found</p>
                <p className="text-[12px] mt-1">Try adjusting your filters</p>
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
        className="absolute top-1/2 -translate-y-1/2 -right-7 z-10 bg-white w-7 h-14 rounded-r-lg shadow-md border border-l-0 border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
      >
        <ChevronLeft
          className={`w-4 h-4 text-[#8B2332] transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>
    </div>
  );
}
