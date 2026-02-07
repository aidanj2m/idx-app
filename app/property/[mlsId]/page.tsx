import Link from 'next/link';
import { notFound } from 'next/navigation';
import { propertyApi } from '@/lib/api/propertyApi';
import { formatPrice, formatNumber } from '@/lib/utils/formatters';
import { PropertyInfo } from '@/components/property/PropertyInfo';
import { PropertyMap } from '@/components/property/PropertyMap';
import { ArrowLeft, Bed, Bath, Maximize, Calendar, MapPin, Phone, Mail } from 'lucide-react';

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ mlsId: string }>;
}) {
  const resolvedParams = await params;
  const mlsId = parseInt(resolvedParams.mlsId);

  if (isNaN(mlsId)) {
    notFound();
  }

  let property;
  try {
    property = await propertyApi.getPropertyById(mlsId);
  } catch (error) {
    console.error('Error fetching property:', error);
    notFound();
  }

  const { property: details, address, listPrice, photos, geo } = property;
  const baths = (details?.bathsFull || 0) + (details?.bathsHalf || 0) * 0.5;

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-[72px]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-5">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-[#8B2332] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>
      </div>

      {/* Photo Gallery */}
      {photos && photos.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px]">
              {/* Main image */}
              <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-l-2xl">
                <img
                  src={photos[0].url || ''}
                  alt={address?.full || 'Property'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Thumbnails */}
              {photos.slice(1, 5).map((photo, idx) => (
                <div
                  key={idx}
                  className={`hidden md:block overflow-hidden ${
                    idx === 1 ? 'rounded-tr-2xl' : idx === 3 ? 'rounded-br-2xl' : ''
                  }`}
                >
                  <img
                    src={photo.url || ''}
                    alt={`Property ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Header with price and quick stats */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 mb-2">
                {address?.full || 'Property Address'}
              </h1>
              <div className="flex items-center gap-1.5 text-stone-500">
                <MapPin className="w-4 h-4 text-[#8B2332]" />
                <p className="text-[15px]">
                  {address?.city}, {address?.state} {address?.postalCode}
                </p>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="font-serif text-4xl font-semibold text-[#8B2332]">
                {formatPrice(listPrice?.price)}
              </p>
              <p className="text-[12px] text-stone-400 mt-1 uppercase tracking-wider">Listing Price</p>
            </div>
          </div>

          {/* Quick stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 mt-8 py-5 px-6 bg-white rounded-xl border border-stone-100">
            <div className="flex items-center gap-2.5 sm:border-r sm:border-stone-100 sm:pr-6">
              <div className="w-9 h-9 rounded-lg bg-[#8B2332]/8 flex items-center justify-center shrink-0">
                <Bed className="w-4.5 h-4.5 text-[#8B2332]" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-stone-900">{details?.bedrooms || 0}</p>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider">Bedrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:border-r sm:border-stone-100 sm:px-6">
              <div className="w-9 h-9 rounded-lg bg-[#8B2332]/8 flex items-center justify-center shrink-0">
                <Bath className="w-4.5 h-4.5 text-[#8B2332]" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-stone-900">{baths}</p>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider">Bathrooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:border-r sm:border-stone-100 sm:px-6">
              <div className="w-9 h-9 rounded-lg bg-[#8B2332]/8 flex items-center justify-center shrink-0">
                <Maximize className="w-4.5 h-4.5 text-[#8B2332]" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-stone-900 truncate">{details?.area ? formatNumber(details.area) : 'N/A'}</p>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider">Sq Ft</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:pl-6">
              <div className="w-9 h-9 rounded-lg bg-[#8B2332]/8 flex items-center justify-center shrink-0">
                <Calendar className="w-4.5 h-4.5 text-[#8B2332]" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-stone-900">{details?.yearBuilt || 'N/A'}</p>
                <p className="text-[11px] text-stone-400 uppercase tracking-wider">Year Built</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact card */}
              <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">Interested in this property?</h3>
                <p className="text-[13px] text-stone-500 mb-6">Get in touch to schedule a viewing or learn more.</p>
                <button className="w-full bg-[#8B2332] text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-[#6d1b28] transition-all hover:shadow-lg text-[15px] mb-3 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Schedule a Showing
                </button>
                <button className="w-full bg-stone-50 text-stone-700 py-3.5 px-4 rounded-xl font-medium hover:bg-stone-100 transition-colors text-[15px] flex items-center justify-center gap-2 border border-stone-200">
                  <Mail className="w-4 h-4" />
                  Request More Info
                </button>
              </div>

              {/* Map */}
              {geo?.lat && geo?.lng && (
                <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="px-6 py-4 border-b border-stone-100">
                    <h4 className="text-[13px] font-semibold text-stone-900 uppercase tracking-wider">Location</h4>
                  </div>
                  <PropertyMap lat={geo.lat} lng={geo.lng} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
