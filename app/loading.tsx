export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero skeleton */}
      <div className="relative min-h-[85vh] bg-stone-200 animate-pulse pt-[72px]">
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="h-3 bg-stone-300 rounded-lg w-32 mb-6" />
            <div className="h-16 bg-stone-300 rounded-lg w-[480px] mb-3" />
            <div className="h-16 bg-stone-300 rounded-lg w-[320px] mb-6" />
            <div className="h-5 bg-stone-300/60 rounded-lg w-[360px] mb-14" />
            <div className="max-w-4xl bg-stone-300/40 rounded-2xl h-48" />
          </div>
        </div>
      </div>
      {/* Featured skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14">
          <div className="h-3 bg-stone-100 rounded-lg w-32 mb-3" />
          <div className="h-10 bg-stone-100 rounded-lg w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
              <div className="h-64 bg-stone-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-stone-100 rounded-lg w-3/4" />
                <div className="h-3 bg-stone-50 rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
