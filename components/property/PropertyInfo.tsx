import { Property } from '@/lib/types/property';
import { formatPrice, formatDate } from '@/lib/utils/formatters';

interface PropertyInfoProps {
  property: Property;
}

function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between items-center py-3.5 border-b border-stone-100 last:border-0">
      <span className="text-[13px] text-stone-500">{label}</span>
      <span className="text-[13px] text-stone-900 font-medium">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="px-6 py-4 border-b border-stone-100">
        <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="px-6 py-2">
        {children}
      </div>
    </div>
  );
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  const { property: details, listPrice, listDate, remarks, geo, address } = property;

  return (
    <div className="space-y-6">
      {/* Description */}
      {remarks && (
        <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider mb-4">About This Property</h3>
          <p className="text-[15px] text-stone-600 leading-relaxed">{remarks}</p>
        </div>
      )}

      {/* Home Details */}
      <Section title="Property Details">
        <InfoRow label="MLS Number" value={property.mlsId} />
        <InfoRow label="List Price" value={formatPrice(listPrice?.price)} />
        <InfoRow label="Date Listed" value={formatDate(listDate)} />
        <InfoRow label="Property Type" value={details?.type} />
        <InfoRow label="Style" value={details?.style} />
        <InfoRow label="Stories" value={details?.stories} />
        <InfoRow label="Lot Size" value={details?.lotSize ? `${details.lotSize} sq ft` : undefined} />
        <InfoRow label="Subdivision" value={details?.subdivision} />
      </Section>

      {/* Construction */}
      {(details?.roof || details?.heating || details?.fireplaces) && (
        <Section title="Construction & Systems">
          <InfoRow label="Roof" value={details?.roof} />
          <InfoRow label="Heating" value={details?.heating} />
          <InfoRow label="Fireplaces" value={details?.fireplaces} />
        </Section>
      )}

      {/* Features */}
      {(details?.interiorFeatures || details?.exteriorFeatures) && (
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="px-6 py-4 border-b border-stone-100">
            <h3 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider">Features</h3>
          </div>
          <div className="px-6 py-5 space-y-5">
            {details?.interiorFeatures && (
              <div>
                <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Interior</p>
                <div className="flex flex-wrap gap-2">
                  {details.interiorFeatures.split(',').map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-stone-50 text-[13px] text-stone-600 rounded-lg border border-stone-100"
                    >
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {details?.exteriorFeatures && (
              <div>
                <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Exterior</p>
                <div className="flex flex-wrap gap-2">
                  {details.exteriorFeatures.split(',').map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-stone-50 text-[13px] text-stone-600 rounded-lg border border-stone-100"
                    >
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Location */}
      {geo?.lat && geo?.lng && (
        <Section title="Location Details">
          <InfoRow label="Address" value={address?.full} />
          <InfoRow label="City" value={address?.city} />
          <InfoRow label="State" value={address?.state} />
          <InfoRow label="Postal Code" value={address?.postalCode} />
        </Section>
      )}
    </div>
  );
}
