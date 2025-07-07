import { Skeleton } from "@/components/ui/skeleton"
import { Camera } from "lucide-react"

export function BusinessProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Banner */}
      <div className="mb-8 rounded-xl border p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border md:h-32 md:w-32">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <Skeleton className="h-9 w-64" />
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-48" />
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Content Layout */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="border-r pr-6">
            <nav className="space-y-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-md">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="min-h-[600px] space-y-8">
            {/* About Section */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-9 w-24" />
              </div>
              <Skeleton className="h-32 w-full rounded-lg" />
            </section>

            {/* Company Images */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-9 w-36" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-md" />
                ))}
              </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg border p-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8" />
                    <div>
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Overview */}
            <div className="rounded-lg border p-6">
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-32 mb-3" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-lg border p-6">
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="grid gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-lg border">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48 mt-1" />
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
