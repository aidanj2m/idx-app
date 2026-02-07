import { HeroSearch } from '@/components/home/HeroSearch';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-[72px]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl mb-14">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-4">
              Texas Real Estate
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold text-white leading-[1.1] mb-6">
              Find Your Place<br />in Texas
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light max-w-lg leading-relaxed">
              Discover luxury homes, family estates, and investment properties across the Lone Star State.
            </p>
          </div>

          {/* Search panel */}
          <div className="max-w-4xl">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <p className="text-[13px] font-medium tracking-[0.2em] uppercase text-[#8B2332] mb-3">
              Curated Selection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 text-[13px] font-semibold text-[#8B2332] hover:text-[#6d1b28] transition-colors group"
          >
            View all listings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <FeaturedProperties />
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#8B2332]"
          >
            View all listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
