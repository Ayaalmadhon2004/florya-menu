/** Small gold divider used under page titles. */
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-gold ${className}`} aria-hidden>
      <span className="h-px w-12 bg-current opacity-60" />
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor" /></svg>
      <span className="h-px w-12 bg-current opacity-60" />
    </div>
  );
}
