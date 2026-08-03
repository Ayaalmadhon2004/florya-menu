"use client";

interface HeaderProps {
  title: string;
  subtitle?: string;
  pageNum?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export default function Header({ title, subtitle, pageNum, onBack, showBack = true }: HeaderProps) {
  return (
    <div className="bg-burgundy text-white">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          {showBack ? (
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              ←
            </button>
          ) : (
            <div className="w-9" />
          )}
          {pageNum && (
            <span className="text-xs text-white/50 font-medium tracking-wider">{pageNum}</span>
          )}
          {!pageNum && <div className="w-9" />}
        </div>
        <h1 className="text-xl font-semibold tracking-wide text-center">{title}</h1>
        {subtitle && (
          <p className="text-sm text-white/60 text-center mt-1 tracking-wider">{subtitle}</p>
        )}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
