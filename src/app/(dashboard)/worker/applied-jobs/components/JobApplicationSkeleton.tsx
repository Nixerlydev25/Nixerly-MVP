import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function JobApplicationsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-80 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Filters and Results Summary Skeleton */}
      <div className="flex items-center justify-between mb-6 gap-4">
        {/* Left side - Results count skeleton */}
        <div>
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Right side - Filters skeleton */}
        <div className="flex items-center gap-3">
          {/* Search skeleton */}
          <Skeleton className="h-10 w-64" />

          {/* Date picker skeletons */}
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      {/* Applications List Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  {/* Job title skeleton */}
                  <Skeleton className="h-6 w-72" />

                  {/* Company info skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </div>
                </div>
                {/* Status badge skeleton */}
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Job details grid skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              {/* Separator */}
              <Skeleton className="h-px w-full" />

              {/* Cover letter section skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="bg-muted/50 p-3 rounded-md space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              {/* Footer skeleton */}
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between mt-8">
        <Skeleton className="h-4 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  )
}
