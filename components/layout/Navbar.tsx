import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors">
          Home Search
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/search"
            className="text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
          >
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
}
