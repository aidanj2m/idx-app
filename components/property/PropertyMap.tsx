'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

interface PropertyMapProps {
  lat: number;
  lng: number;
}

export function PropertyMap({ lat, lng }: PropertyMapProps) {
  return (
    <div className="rounded-lg overflow-hidden h-[300px] w-full">
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        scrollZoom={false}
      >
        <Marker longitude={lng} latitude={lat} anchor="center">
          <div className="w-8 h-8 bg-blue-600 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
        </Marker>
      </Map>
    </div>
  );
}
