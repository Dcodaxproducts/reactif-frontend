export function BookingCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-4 w-2/3 bg-slate-700 rounded" />
      <div className="h-4 w-1/2 bg-slate-700 rounded" />
      <div className="h-12 w-full bg-slate-800 rounded-xl" />
      <div className="h-12 w-full bg-slate-800 rounded-xl" />
      <div className="h-12 w-full bg-slate-800 rounded-xl" />
    </div>
  );
}
