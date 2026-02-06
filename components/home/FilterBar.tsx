'use client';

import { useState, useRef, useEffect } from 'react';

interface FilterBarProps {
  filters: Record<string, string>;
  onChange: (filters: Record<string, string>) => void;
}

const PRICE_RANGES = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under $200K', min: '', max: '200000' },
  { label: '$200K - $500K', min: '200000', max: '500000' },
  { label: '$500K - $1M', min: '500000', max: '1000000' },
  { label: '$1M+', min: '1000000', max: '' },
];

const STATUS_OPTIONS = [
  { label: 'Any Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Sold', value: 'sold' },
  { label: 'Rentals', value: 'RNT' },
];

const TYPE_OPTIONS = [
  { label: 'Any Type', value: '' },
  { label: 'Residential', value: 'RES' },
  { label: 'Condo', value: 'CND' },
  { label: 'Multifamily', value: 'MUL' },
];

const BED_OPTIONS = [
  { label: 'Any Beds', value: '' },
  { label: '1+ Beds', value: '1' },
  { label: '2+ Beds', value: '2' },
  { label: '3+ Beds', value: '3' },
  { label: '4+ Beds', value: '4' },
  { label: '5+ Beds', value: '5' },
];

function FilterDropdown({
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

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
          value
            ? 'bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black border-[#D4AF37]'
            : 'bg-zinc-900 text-gray-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
        }`}
      >
        {selectedLabel}
        <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-zinc-900 rounded-lg shadow-2xl border border-zinc-700 py-2 min-w-[180px] z-[9999]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors ${
                value === option.value ? 'text-[#D4AF37] font-semibold bg-zinc-800/50' : 'text-gray-300'
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

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const handlePriceChange = (index: number) => {
    const range = PRICE_RANGES[index];
    const updated = { ...filters };
    if (range.min) updated.minprice = range.min;
    else delete updated.minprice;
    if (range.max) updated.maxprice = range.max;
    else delete updated.maxprice;
    onChange(updated);
  };

  const currentPriceLabel =
    PRICE_RANGES.find(
      (r) => r.min === (filters.minprice || '') && r.max === (filters.maxprice || '')
    )?.label || 'Price Range';

  const priceOptions = PRICE_RANGES.map((r, i) => ({
    label: r.label,
    value: String(i),
  }));

  const currentPriceValue = String(
    PRICE_RANGES.findIndex(
      (r) => r.min === (filters.minprice || '') && r.max === (filters.maxprice || '')
    )
  );

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <FilterDropdown
        label="Price Range"
        options={priceOptions}
        value={currentPriceValue === '-1' ? '' : currentPriceValue}
        onSelect={(v) => handlePriceChange(Number(v))}
      />
      <FilterDropdown
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
      <FilterDropdown
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
      <FilterDropdown
        label="Beds"
        options={BED_OPTIONS}
        value={filters.minbeds || ''}
        onSelect={(v) => {
          const updated = { ...filters };
          if (v) updated.minbeds = v;
          else delete updated.minbeds;
          onChange(updated);
        }}
      />
    </div>
  );
}
