"use client";

interface BottomNavProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (page: number) => void;
}

export default function BottomNav({ currentPage, totalPages, onPrev, onNext, onDotClick }: BottomNavProps) {
  return (
    <nav
      className="bg-white border-t border-beige-dark px-6 py-3 flex items-center justify-between"
      aria-label="Page navigation"
    >
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        aria-label="Previous page"
        className="flex items-center gap-1 px-4 py-3 rounded-lg border border-beige-dark text-sm font-medium text-text-primary hover:border-burgundy hover:text-burgundy transition disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px] min-w-[80px]"
      >
        ← Prev
      </button>

      <div className="flex gap-2 items-center" role="tablist" aria-label="Menu pages">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            role="tab"
            aria-selected={i === currentPage}
            aria-label={`Page ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-200 ${
              i === currentPage ? "w-5 bg-burgundy" : "w-2 bg-beige-dark hover:bg-text-muted"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next page"
        className="flex items-center gap-1 px-4 py-3 rounded-lg border border-beige-dark text-sm font-medium text-text-primary hover:border-burgundy hover:text-burgundy transition disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px] min-w-[80px]"
      >
        Next →
      </button>
    </nav>
  );
}