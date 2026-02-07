'use client';

import Map, { Marker } from 'react-map-gl/mapbox';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  lat: number;
  lng: number;
}

export function PropertyMap({ lat, lng }: PropertyMapProps) {
  return (
    <div className="h-[300px] w-full">
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
          <div className="w-10 h-10 bg-[#8B2332] rounded-full border-[3px] border-white shadow-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
        </Marker>
      </Map>
    </div>
  );
}
