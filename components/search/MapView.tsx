'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import Map, { Source, Layer, Popup, NavigationControl, type MapRef } from 'react-map-gl/mapbox';
import { Property } from '@/lib/types/property';
import { PropertyPopup } from './PropertyPopup';
import { MapStyleToggle } from './MapStyleToggle';
import { formatPrice } from '@/lib/utils/formatters';

const MAPBOX_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
};

interface MapViewProps {
  properties: Property[];
  hoveredPropertyId: number | null;
  onPropertyHover: (mlsId: number | null) => void;
  onPropertyClick: (mlsId: number) => void;
  mapStyle: 'streets' | 'satellite';
  onStyleToggle: () => void;
}

/** Creates a stretchable pill-shaped image for use with icon-text-fit */
function createPillImage(color: string, borderColor: string): ImageData {
  const w = 40;
  const h = 24;
  const r = h / 2;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(1, 1, w - 2, h - 2, r);
  ctx.fill();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(1, 1, w - 2, h - 2, r);
  ctx.stroke();

  return ctx.getImageData(0, 0, w, h);
}

/** Adds the pill background images to the map instance */
function addPillImages(map: mapboxgl.Map) {
  const w = 40;
  const h = 24;
  const r = h / 2;
  const stretchConfig = {
    content: [r, 4, w - r, h - 4] as [number, number, number, number],
    stretchX: [[r, w - r]] as [number, number][],
    stretchY: [[8, h - 8]] as [number, number][],
    pixelRatio: 2,
  };

  if (!map.hasImage('price-pill')) {
    map.addImage('price-pill', createPillImage('#ffffff', '#e5e7eb'), stretchConfig);
  }
  if (!map.hasImage('price-pill-hover')) {
    map.addImage('price-pill-hover', createPillImage('#8B2332', '#6d1b28'), stretchConfig);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PROPERTY_LABEL_LAYER: any = {
  id: 'property-labels',
  type: 'symbol',
  source: 'properties',
  layout: {
    'icon-image': 'price-pill',
    'icon-text-fit': 'both',
    'icon-text-fit-padding': [3, 6, 3, 6],
    'icon-allow-overlap': false,
    'icon-ignore-placement': false,
    'text-field': ['get', 'price'],
    'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
    'text-allow-overlap': false,
    'text-ignore-placement': false,
  },
  paint: {
    'text-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#ffffff',
      '#1a1a1a',
    ],
  },
};

export function MapView({
  properties,
  hoveredPropertyId,
  onPropertyHover,
  onPropertyClick,
  mapStyle,
  onStyleToggle,
}: MapViewProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [cursor, setCursor] = useState('default');
  const hoveredIdRef = useRef<number | null>(null);

  const geojsonData = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: properties
        .filter((p) => p.geo?.lat && p.geo?.lng)
        .map((p) => ({
          type: 'Feature' as const,
          id: p.mlsId,
          geometry: {
            type: 'Point' as const,
            coordinates: [p.geo!.lng!, p.geo!.lat!],
          },
          properties: {
            mlsId: p.mlsId,
            price: formatPrice(p.listPrice?.price),
          },
        })),
    }),
    [properties]
  );

  const hoveredProperty = properties.find((p) => p.mlsId === hoveredPropertyId);

  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    addPillImages(map);
    map.on('style.load', () => addPillImages(map));

    setMapLoaded(true);
  }, []);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapLoaded) return;

    if (hoveredIdRef.current !== null) {
      try {
        map.setFeatureState(
          { source: 'properties', id: hoveredIdRef.current },
          { hover: false }
        );
      } catch {
        // Source may not be ready yet
      }
    }

    if (hoveredPropertyId !== null) {
      try {
        map.setFeatureState(
          { source: 'properties', id: hoveredPropertyId },
          { hover: true }
        );
      } catch {
        // Source may not be ready yet
      }
    }

    hoveredIdRef.current = hoveredPropertyId;
  }, [hoveredPropertyId, mapLoaded]);

  const handleMouseMove = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const features = event.features;
      if (!features || features.length === 0) {
        setCursor('default');
        onPropertyHover(null);
        return;
      }
      setCursor('pointer');
      const mlsId = features[0].properties?.mlsId;
      if (mlsId != null) onPropertyHover(mlsId);
    },
    [onPropertyHover]
  );

  const handleMouseLeave = useCallback(() => {
    setCursor('default');
    onPropertyHover(null);
  }, [onPropertyHover]);

  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const features = event.features;
      if (!features || features.length === 0) return;
      const mlsId = features[0].properties?.mlsId;
      if (mlsId != null) onPropertyClick(mlsId);
    },
    [onPropertyClick]
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -95.3698,
          latitude: 29.7604,
          zoom: 10,
        }}
        mapStyle={MAPBOX_STYLES[mapStyle]}
        style={{ width: '100%', height: '100%' }}
        cursor={cursor}
        interactiveLayerIds={['property-labels']}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onLoad={handleMapLoad}
      >
        <NavigationControl position="top-left" />

        <Source id="properties" type="geojson" data={geojsonData}>
          <Layer {...PROPERTY_LABEL_LAYER} />
        </Source>

        {hoveredProperty && hoveredProperty.geo?.lat && hoveredProperty.geo?.lng && (
          <Popup
            longitude={hoveredProperty.geo.lng}
            latitude={hoveredProperty.geo.lat}
            anchor="bottom"
            offset={20}
            closeButton={false}
            closeOnClick={false}
          >
            <PropertyPopup property={hoveredProperty} />
          </Popup>
        )}
      </Map>

      <MapStyleToggle style={mapStyle} onToggle={onStyleToggle} />
    </div>
  );
}
