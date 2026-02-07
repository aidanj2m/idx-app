export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-200 border-t-[#8B2332]" />
      </div>
    </div>
  );
};
