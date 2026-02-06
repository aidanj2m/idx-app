import { Property } from '@/lib/types/property';
import { formatPrice, formatNumber, formatDate } from '@/lib/utils/formatters';

interface PropertyInfoProps {
  property: Property;
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between py-2 border-b border-zinc-800 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 rounded-lg shadow-sm border border-zinc-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  const { property: details, address, listPrice, listDate, remarks, geo } = property;

  const baths = (details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5;

  return (
    <div className="space-y-6">
      {/* Key Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bedrooms', value: details?.bedrooms || 0 },
          { label: 'Bathrooms', value: baths },
          { label: 'Sq Ft', value: details?.area ? formatNumber(details.area) : 'N/A' },
          { label: 'Year Built', value: details?.yearBuilt || 'N/A' },
        ].map((stat) => (
          <div key={stat.label} className="bg-zinc-900 rounded-lg shadow-sm border border-zinc-800 p-4 text-center">
            <p className="text-2xl font-bold text-[#D4AF37]">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      {remarks && (
        <Section title="Description">
          <p className="text-gray-300 leading-relaxed text-sm">{remarks}</p>
        </Section>
      )}

      {/* Home Details */}
      <Section title="Home Details">
        <InfoRow label="MLS #" value={property.mlsId} />
        <InfoRow label="List Price" value={formatPrice(listPrice?.price)} />
        <InfoRow label="List Date" value={formatDate(listDate)} />
        <InfoRow label="Property Type" value={details?.type} />
        <InfoRow label="Style" value={details?.style} />
        <InfoRow label="Stories" value={details?.stories} />
        <InfoRow label="Lot Size" value={details?.lotSize ? `${details.lotSize} sq ft` : undefined} />
        <InfoRow label="Subdivision" value={details?.subdivision} />
      </Section>

      {/* Construction */}
      {(details?.roof || details?.heating || details?.fireplaces) && (
        <Section title="Construction">
          <InfoRow label="Roof" value={details?.roof} />
          <InfoRow label="Heating" value={details?.heating} />
          <InfoRow label="Fireplaces" value={details?.fireplaces} />
        </Section>
      )}

      {/* Features */}
      {(details?.interiorFeatures || details?.exteriorFeatures) && (
        <Section title="Features">
          {details?.interiorFeatures && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-300 mb-1">Interior</p>
              <p className="text-sm text-gray-400">{details.interiorFeatures}</p>
            </div>
          )}
          {details?.exteriorFeatures && (
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Exterior</p>
              <p className="text-sm text-gray-400">{details.exteriorFeatures}</p>
            </div>
          )}
        </Section>
      )}

      {/* Location */}
      {geo?.lat && geo?.lng && (
        <Section title="Location">
          <div className="text-sm text-gray-400">
            <p>{address?.full}</p>
            <p className="mt-1">{address?.city}, {address?.state} {address?.postalCode}</p>
            <p className="mt-1 text-xs text-gray-500">Coordinates: {geo.lat}, {geo.lng}</p>
          </div>
        </Section>
      )}
    </div>
  );
}
