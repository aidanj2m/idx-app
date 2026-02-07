export default function SearchLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-72px)] pt-[72px] overflow-hidden bg-[#fafaf9]">
      {/* Filter bar skeleton */}
      <div className="shrink-0 bg-white border-b border-stone-200 px-4 py-3">
        <div className="flex items-end gap-3">
          <div className="h-[52px] bg-stone-100 rounded-lg animate-pulse w-[200px]" />
          <div className="h-[52px] bg-stone-100 rounded-lg animate-pulse w-[130px]" />
          <div className="h-[52px] bg-stone-100 rounded-lg animate-pulse w-[130px]" />
          <div className="h-[52px] bg-stone-100 rounded-lg animate-pulse w-[120px]" />
          <div className="h-[52px] bg-stone-100 rounded-lg animate-pulse flex-1 min-w-[200px]" />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar skeleton */}
        <div className="w-[380px] bg-[#fafaf9] border-r border-stone-200">
          <div className="px-4 py-3 border-b border-stone-100">
            <div className="h-4 bg-stone-200 rounded-lg animate-pulse w-32" />
          </div>
          <div className="p-3 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <div className="h-36 bg-stone-100 animate-pulse" />
                <div className="p-3.5 space-y-2">
                  <div className="h-3 bg-stone-100 rounded-lg animate-pulse w-3/4" />
                  <div className="h-3 bg-stone-50 rounded-lg animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Map skeleton */}
        <div className="flex-1 bg-stone-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-200 border-t-[#8B2332]" />
        </div>
      </div>
    </div>
  );
}
