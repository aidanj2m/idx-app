export default function PropertyLoading() {
  return (
    <div className="min-h-screen bg-[#fafaf9] pt-[72px] animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="h-4 bg-stone-200 rounded-lg w-28" />
      </div>

      {/* Photo gallery skeleton */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1.5 h-[480px]">
            <div className="md:col-span-2 md:row-span-2 bg-stone-200 rounded-l-2xl" />
            <div className="hidden md:block bg-stone-200 rounded-tr-2xl" />
            <div className="hidden md:block bg-stone-200" />
            <div className="hidden md:block bg-stone-200" />
            <div className="hidden md:block bg-stone-200 rounded-br-2xl" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="h-9 bg-stone-200 rounded-lg w-96 mb-3" />
              <div className="h-4 bg-stone-100 rounded-lg w-56" />
            </div>
            <div>
              <div className="h-10 bg-stone-200 rounded-lg w-40" />
              <div className="h-3 bg-stone-100 rounded-lg w-24 mt-2 ml-auto" />
            </div>
          </div>
          {/* Stats bar skeleton */}
          <div className="mt-8 py-5 px-6 bg-white rounded-xl border border-stone-100">
            <div className="flex gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100" />
                  <div>
                    <div className="h-5 bg-stone-200 rounded w-10 mb-1" />
                    <div className="h-2.5 bg-stone-100 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-stone-100 p-6 h-48" />
            <div className="bg-white rounded-2xl border border-stone-100 p-6 h-72" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-100 p-6 h-80" />
          </div>
        </div>
      </div>
    </div>
  );
}
