import { Card, CardContent } from "@/components/ui/card";

export function SkeletonCard() {
  return (
    <Card className="relative rounded-[24px] overflow-hidden animate-pulse border-0 bg-transparent p-0 shadow-none">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
      <CardContent className="relative z-10 rounded-[24px] border border-[#F5F5F520] bg-black/40 p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        <div className="w-14 h-14 rounded-xl bg-gray-700" />
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-gray-700 rounded" />
          <div className="h-4 w-1/2 bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
