import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl text-[13px] font-medium hover:border-[#8B2332]/30 hover:text-[#8B2332] disabled:bg-stone-50 disabled:text-stone-300 disabled:border-stone-100 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      <span className="px-4 py-2.5 bg-[#8B2332]/5 rounded-xl text-[13px] font-semibold text-[#8B2332] min-w-[80px] text-center">
        Page {currentPage}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-stone-200 text-stone-700 rounded-xl text-[13px] font-medium hover:border-[#8B2332]/30 hover:text-[#8B2332] disabled:bg-stone-50 disabled:text-stone-300 disabled:border-stone-100 disabled:cursor-not-allowed transition-all"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
