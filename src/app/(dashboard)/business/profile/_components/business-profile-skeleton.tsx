import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export function BusinessProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <Skeleton className="h-24 w-24 rounded-xl md:h-32 md:w-32" />
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="space-y-3 w-full">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32 hidden md:inline" />
                  <Skeleton className="h-4 w-24 hidden md:inline" />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-36 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar Skeleton */}
        <div className="space-y-6 md:order-2">
          {/* Business Information Skeleton */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="h-7 w-48 mb-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div>
                <Skeleton className="h-5 w-40 mb-3" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <Skeleton className="h-5 w-32 mb-3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Images Skeleton */}
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="h-7 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="space-y-8 md:col-span-2 md:order-1">
          {/* About Skeleton */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </section>

          <Separator />

          {/* Tabs Skeleton */}
          <div>
            <div className="border-b">
              <div className="flex">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
              </div>
            </div>

            {/* Services Tab Content Skeleton */}
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-9 w-32" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
