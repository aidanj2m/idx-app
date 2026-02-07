'use client';

import { Map, Satellite } from 'lucide-react';

interface MapStyleToggleProps {
  style: 'streets' | 'satellite';
  onToggle: () => void;
}

export function MapStyleToggle({ style, onToggle }: MapStyleToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.1)] border border-stone-100 text-[13px] font-medium text-stone-600 hover:text-[#8B2332] transition-all flex items-center gap-2"
    >
      {style === 'streets' ? (
        <>
          <Satellite className="w-4 h-4" />
          Satellite
        </>
      ) : (
        <>
          <Map className="w-4 h-4" />
          Map
        </>
      )}
    </button>
  );
}
