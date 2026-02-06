import { Property } from '@/lib/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
}

export const PropertyGrid = ({ properties }: PropertyGridProps) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No properties found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.mlsId} property={property} />
      ))}
    </div>
  );
};
