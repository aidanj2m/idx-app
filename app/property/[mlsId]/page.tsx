import Link from 'next/link';
import { notFound } from 'next/navigation';
import { propertyApi } from '@/lib/api/propertyApi';
import { formatPrice } from '@/lib/utils/formatters';
import { PropertyInfo } from '@/components/property/PropertyInfo';
import { PropertyMap } from '@/components/property/PropertyMap';

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

  const { address, listPrice, photos, geo } = property;

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          href="/search"
          className="text-[#D4AF37] hover:text-[#F8D673] text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {address?.full || 'Property Address'}
            </h1>
            <p className="text-gray-400 mt-1">
              {address?.city}, {address?.state} {address?.postalCode}
            </p>
          </div>
          <p className="text-3xl font-bold text-[#D4AF37] mt-2 md:mt-0">
            {formatPrice(listPrice?.price)}
          </p>
        </div>

        {/* Photo Gallery */}
        {photos && photos.length > 0 && (
          <div className="rounded-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px]">
              {/* Main image */}
              <div className="md:col-span-2 md:row-span-2 overflow-hidden">
                <img
                  src={photos[0].url || ''}
                  alt={address?.full || 'Property'}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              {photos.slice(1, 5).map((photo, idx) => (
                <div key={idx} className="hidden md:block overflow-hidden">
                  <img
                    src={photo.url || ''}
                    alt={`Property ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact */}
            <div className="bg-zinc-900 rounded-lg shadow-sm border border-zinc-800 p-6 sticky top-20">
              <h3 className="text-lg font-semibold text-white mb-4">Interested?</h3>
              <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all mb-3">
                Schedule a Showing
              </button>
              <button className="w-full bg-zinc-800 text-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-zinc-700 hover:text-white transition-colors">
                Request More Info
              </button>

              {/* Map */}
              {geo?.lat && geo?.lng && (
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Location</h4>
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
