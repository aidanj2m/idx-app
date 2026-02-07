'use client';

import { useState, useRef, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { ChevronDown, Minus, Plus } from 'lucide-react';

interface FilterBarProps {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

const STATUS_OPTIONS = [
  { label: 'Active', value: '' },
  { label: 'Sold', value: 'sold' },
  { label: 'Rentals', value: 'RNT' },
];

const TYPE_OPTIONS = [
  { label: 'All listings', value: '' },
  { label: 'Residential', value: 'RES' },
  { label: 'Condo', value: 'CND' },
  { label: 'Multifamily', value: 'MUL' },
];

function Dropdown({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || options[0].label;

  return (
    <div ref={ref} className="relative">
      <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3.5 h-[42px] bg-white border rounded-lg text-[13px] hover:border-stone-300 transition-all min-w-[140px] justify-between ${
          open ? 'border-[#8B2332]/30 ring-2 ring-[#8B2332]/10' : 'border-stone-200'
        }`}
      >
        <span className="text-[13px] font-medium text-stone-800">{selectedLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-stone-100 py-1.5 min-w-[180px] z-[9999]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
                value === option.value
                  ? 'text-[#8B2332] font-semibold bg-[#8B2332]/5'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BedsCounter({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">Bedrooms</span>
      <div className="flex items-center h-[42px] border border-stone-200 rounded-lg bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="px-3 h-full text-stone-400 hover:text-[#8B2332] hover:bg-stone-50 transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="px-3 text-[13px] font-medium text-stone-800 min-w-[50px] text-center border-x border-stone-200">
          {value}+
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(10, value + 1))}
          className="px-3 h-full text-stone-400 hover:text-[#8B2332] hover:bg-stone-50 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function PriceRangeSlider({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: {
  minPrice: number;
  maxPrice: number;
  onMinChange: (val: number) => void;
  onMaxChange: (val: number) => void;
}) {
  const MAX = 5000000;

  const minPct = minPrice / MAX;
  const maxPct = maxPrice / MAX;

  // Distribution curve points (x 0-1, y 0-1 where 1 = top)
  const curvePoints = [
    [0, 0.02], [0.05, 0.06], [0.1, 0.14], [0.15, 0.3], [0.2, 0.55],
    [0.25, 0.78], [0.3, 0.92], [0.35, 1.0], [0.4, 0.9], [0.45, 0.76],
    [0.5, 0.62], [0.55, 0.5], [0.6, 0.4], [0.65, 0.32], [0.7, 0.25],
    [0.75, 0.19], [0.8, 0.14], [0.85, 0.1], [0.9, 0.07], [0.95, 0.04], [1, 0.02],
  ];

  const graphH = 32;
  const toSvgPoints = (pts: number[][]) =>
    pts.map(([x, y]) => `${x * 200},${graphH - y * (graphH - 2)}`).join(' ');
  const areaPoints = `0,${graphH} ${toSvgPoints(curvePoints)} 200,${graphH}`;
  const linePoints = toSvgPoints(curvePoints);

  const formatLabel = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  return (
    <div className="flex-1 min-w-[240px]">
      <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">Price Range</span>

      {/* Distribution graph */}
      <svg viewBox={`0 0 200 ${graphH}`} className="w-full h-8 block" preserveAspectRatio="none">
        <defs>
          <clipPath id="active-range">
            <rect x={minPct * 200} y="0" width={(maxPct - minPct) * 200} height={graphH} />
          </clipPath>
        </defs>
        {/* Inactive area */}
        <polygon fill="#e7e5e4" opacity="0.5" points={areaPoints} />
        {/* Active area */}
        <polygon fill="rgba(139,35,50,0.2)" clipPath="url(#active-range)" points={areaPoints} />
        {/* Line */}
        <polyline fill="none" stroke="rgba(139,35,50,0.3)" strokeWidth="1" points={linePoints} />
        {/* Active line */}
        <polyline fill="none" stroke="#8B2332" strokeWidth="1.5" clipPath="url(#active-range)" points={linePoints} />
      </svg>

      {/* Slider directly below graph */}
      <Slider.Root
        min={0}
        max={MAX}
        step={50000}
        value={[minPrice, maxPrice]}
        onValueChange={([min, max]) => {
          onMinChange(min);
          onMaxChange(max);
        }}
        minStepsBetweenThumbs={1}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
          touchAction: 'none',
          width: '100%',
          height: '16px',
          marginTop: '-1px',
        }}
      >
        <Slider.Track
          style={{
            position: 'relative',
            flexGrow: 1,
            height: '2px',
            background: '#d6d3d1',
            borderRadius: '9999px',
          }}
        >
          <Slider.Range
            style={{
              position: 'absolute',
              height: '100%',
              background: '#8B2332',
              borderRadius: '9999px',
            }}
          />
        </Slider.Track>
        <Slider.Thumb
          aria-label="Minimum price"
          style={{
            display: 'block',
            width: '14px',
            height: '14px',
            background: '#8B2332',
            borderRadius: '50%',
            cursor: 'pointer',
            border: '2.5px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            outline: 'none',
          }}
        />
        <Slider.Thumb
          aria-label="Maximum price"
          style={{
            display: 'block',
            width: '14px',
            height: '14px',
            background: '#8B2332',
            borderRadius: '50%',
            cursor: 'pointer',
            border: '2.5px solid white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            outline: 'none',
          }}
        />
      </Slider.Root>

      {/* Price labels */}
      <div className="flex justify-between mt-0.5">
        <span className="text-[11px] text-stone-500">{formatLabel(minPrice)}</span>
        <span className="text-[11px] text-stone-500">{maxPrice >= MAX ? '$5M+' : formatLabel(maxPrice)}</span>
      </div>
    </div>
  );
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const beds = Number(filters.minbeds || '0');
  const minPrice = Number(filters.minprice || '0');
  const maxPrice = Number(filters.maxprice || '5000000');

  return (
    <div className="flex items-end gap-3">
      <Dropdown
        label="Status"
        options={STATUS_OPTIONS}
        value={filters.status || ''}
        onSelect={(v) => {
          const updated = { ...filters };
          if (v) updated.status = v;
          else delete updated.status;
          onChange(updated);
        }}
      />
      <Dropdown
        label="Type"
        options={TYPE_OPTIONS}
        value={filters.type || ''}
        onSelect={(v) => {
          const updated = { ...filters };
          if (v) updated.type = v;
          else delete updated.type;
          onChange(updated);
        }}
      />
      <BedsCounter
        value={beds}
        onChange={(val) => {
          const updated = { ...filters };
          if (val > 0) updated.minbeds = String(val);
          else delete updated.minbeds;
          onChange(updated);
        }}
      />
      <PriceRangeSlider
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinChange={(val) => {
          const updated = { ...filters };
          if (val > 0) updated.minprice = String(val);
          else delete updated.minprice;
          onChange(updated);
        }}
        onMaxChange={(val) => {
          const updated = { ...filters };
          if (val < 5000000) updated.maxprice = String(val);
          else delete updated.maxprice;
          onChange(updated);
        }}
      />
    </div>
  );
}
