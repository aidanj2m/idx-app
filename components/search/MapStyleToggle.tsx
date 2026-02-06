'use client';

interface MapStyleToggleProps {
  style: 'streets' | 'satellite';
  onToggle: () => void;
}

export function MapStyleToggle({ style, onToggle }: MapStyleToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-4 right-4 z-10 bg-zinc-900 px-4 py-2 rounded-lg shadow-lg border border-zinc-800 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
    >
      {style === 'streets' ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Satellite
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Map
        </>
      )}
    </button>
  );
}
