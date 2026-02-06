'use client';

import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import Map, { Source, Layer, Popup, NavigationControl, type MapRef } from 'react-map-gl/mapbox';
import { Property } from '@/lib/types/property';
import { PropertyPopup } from './PropertyPopup';
import { MapStyleToggle } from './MapStyleToggle';
import { formatPrice } from '@/lib/utils/formatters';

const MAPBOX_STYLES = {
  streets: 'mapbox://styles/mapbox/dark-v11',
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
  // Wider image so there's an actual stretchable center section
  const w = 40;
  const h = 24;
  const r = h / 2; // full-height rounding for pill ends
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Draw pill (rounded rect with full-radius corners)
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
  const r = h / 2; // 12px — matches the rounded ends
  const stretchConfig = {
    // content = text placement area [x1, y1, x2, y2]
    content: [r, 4, w - r, h - 4] as [number, number, number, number],
    // stretchX/Y = which pixel ranges can be stretched (must be non-zero width!)
    stretchX: [[r, w - r]] as [number, number][],   // [[12, 28]] — 16px horizontal
    stretchY: [[8, h - 8]] as [number, number][],    // [[8, 16]]  — 8px vertical
    pixelRatio: 2,
  };

  if (!map.hasImage('price-pill')) {
    map.addImage('price-pill', createPillImage('#18181b', '#27272a'), stretchConfig);
  }
  if (!map.hasImage('price-pill-hover')) {
    map.addImage('price-pill-hover', createPillImage('#D4AF37', '#F8D673'), stretchConfig);
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
      '#000000',
      '#D4AF37',
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

  // Convert properties to GeoJSON — rendered natively by Mapbox GL on the WebGL canvas
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

  // Add pill images on map load + re-add on style change
  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    addPillImages(map);

    // Re-add images when style changes (e.g. streets ↔ satellite)
    map.on('style.load', () => addPillImages(map));

    setMapLoaded(true);
  }, []);

  // Sync hover state from sidebar → map feature state
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map || !mapLoaded) return;

    // Clear previous
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

    // Set new
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

  // Handle map hover → highlight pin + notify parent
  const handleMouseMove = useCallback(
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

  // Handle click → navigate to property
  const handleClick = useCallback(
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
