import { Skeleton } from "@/components/ui/skeleton";

export default function FeedSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4">
          <Skeleton className="h-10 w-[300px]" />
          <div className="flex border rounded-md overflow-hidden">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full mb-8" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="space-y-6">
            {/* Filter groups */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col space-y-4">
            {/* Job Items */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col p-6 bg-card rounded-lg border space-y-4"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-36" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>

                <Skeleton className="h-20 w-full" />

                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-7 w-20 rounded-full" />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t pt-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-24" />
                <div className="flex items-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10" />
                  ))}
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 