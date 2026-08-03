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
    <div className="bg-white border-t border-beige-dark px-6 py-3 flex items-center justify-between">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        aria-label="Previous page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-beige-dark text-sm font-medium text-text-primary hover:border-burgundy hover:text-burgundy transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to page ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === currentPage ? "w-5 bg-burgundy" : "w-1.5 bg-beige-dark"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg border border-beige-dark text-sm font-medium text-text-primary hover:border-burgundy hover:text-burgundy transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </div>
  );
}
