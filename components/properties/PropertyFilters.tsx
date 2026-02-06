'use client';

import { useState } from 'react';
import { PropertyFilters as IPropertyFilters } from '@/lib/types/property';
import { PROPERTY_TYPES } from '@/lib/utils/constants';

interface PropertyFiltersProps {
  filters: IPropertyFilters;
  onFilterChange: (filters: IPropertyFilters) => void;
  onReset: () => void;
}

export const PropertyFilters = ({
  filters,
  onFilterChange,
  onReset,
}: PropertyFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<IPropertyFilters>({
    minprice: filters.minprice || undefined,
    maxprice: filters.maxprice || undefined,
    minbeds: filters.minbeds || undefined,
    maxbeds: filters.maxbeds || undefined,
    minbaths: filters.minbaths || undefined,
    maxbaths: filters.maxbaths || undefined,
    type: filters.type || undefined,
  });

  const handleInputChange = (field: keyof IPropertyFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value === '' ? undefined : field === 'type' ? value : Number(value),
    }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({
      minprice: undefined,
      maxprice: undefined,
      minbeds: undefined,
      maxbeds: undefined,
      minbaths: undefined,
      maxbaths: undefined,
      type: undefined,
    });
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={localFilters.minprice || ''}
            onChange={(e) => handleInputChange('minprice', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localFilters.maxprice || ''}
            onChange={(e) => handleInputChange('maxprice', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bedrooms
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Beds"
            value={localFilters.minbeds || ''}
            onChange={(e) => handleInputChange('minbeds', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Beds"
            value={localFilters.maxbeds || ''}
            onChange={(e) => handleInputChange('maxbeds', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bathrooms
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Baths"
            value={localFilters.minbaths || ''}
            onChange={(e) => handleInputChange('minbaths', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Baths"
            value={localFilters.maxbaths || ''}
            onChange={(e) => handleInputChange('maxbaths', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <select
          value={localFilters.type || ''}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
