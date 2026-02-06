interface PaginationProps {
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const Pagination = ({
  currentPage,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black rounded-md hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:bg-zinc-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all font-semibold"
      >
        Previous
      </button>
      <span className="text-gray-300 font-medium">Page {currentPage}</span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F8D673] text-black rounded-md hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:bg-zinc-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all font-semibold"
      >
        Next
      </button>
    </div>
  );
};
