'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, User } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-0.5 group">
          <span className="text-[22px] font-bold tracking-tight text-stone-900 group-hover:text-[#8B2332] transition-colors">
            TexasHomes
          </span>
          <span className="text-[22px] font-bold text-[#8B2332]">.com</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          <Link href="/search" className="text-[13px] font-medium tracking-wide uppercase text-stone-500 hover:text-[#8B2332] transition-colors">
            Listings
          </Link>
          <Link href="/search" className="text-[13px] font-medium tracking-wide uppercase text-stone-500 hover:text-[#8B2332] transition-colors">
            Buy & Sell
          </Link>
          <Link href="/search" className="text-[13px] font-medium tracking-wide uppercase text-stone-500 hover:text-[#8B2332] transition-colors">
            Home Estimate
          </Link>
          <Link href="/search" className="text-[13px] font-medium tracking-wide uppercase text-stone-500 hover:text-[#8B2332] transition-colors">
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+1234567890"
            className="hidden md:flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-[#8B2332] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            (512) 555-0100
          </a>
          <div className="hidden md:block w-px h-5 bg-stone-200" />
          <Link
            href="/search"
            className="hidden md:flex items-center gap-2 text-[13px] font-medium text-stone-500 hover:text-[#8B2332] transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            Sign in
          </Link>
          <Link
            href="/search"
            className="px-5 py-2.5 bg-[#8B2332] text-white text-[13px] font-semibold rounded-lg hover:bg-[#6d1b28] transition-all hover:shadow-md"
          >
            Contact Us
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-stone-600 hover:text-[#8B2332] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 px-6 py-4 space-y-1">
          {['Listings', 'Buy & Sell', 'Home Estimate', 'About'].map((item) => (
            <Link
              key={item}
              href="/search"
              className="block py-3 text-[15px] font-medium text-stone-700 hover:text-[#8B2332] transition-colors border-b border-stone-50 last:border-0"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="pt-3 flex items-center gap-3">
            <Link href="/search" className="text-[13px] font-medium text-stone-500">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
