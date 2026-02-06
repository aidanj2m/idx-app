import { HeroSearch } from '@/components/home/HeroSearch';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative text-center max-w-4xl mx-auto pt-20 pb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Home<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F8D673] to-[#D4AF37] bg-clip-text text-transparent">
              in Texas
            </span>
          </h1>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Advanced property search technology to find your perfect home
          </p>
          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Featured Listings
          </h2>
          <p className="text-gray-400">
            Explore available properties
          </p>
        </div>
        <FeaturedProperties />
      </section>
    </div>
  );
}
