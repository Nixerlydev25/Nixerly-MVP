import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function FreelancerProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to dashboard */}
        <div className="mb-6 inline-flex items-center text-sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Profile Banner */}
        <div className="mb-8 rounded-xl border p-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-shrink-0 relative group w-[120px] h-[120px]">
              <Skeleton className="w-full h-full rounded-full" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-48" />
                  </div>
                  <Skeleton className="h-6 w-36 mt-2" />
                  <div className="mt-2 flex items-center">
                    <Skeleton className="h-4 w-4 mr-1" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-24" />
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
                {[1, 2, 3, 4, 5].map((i) => (
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
              {/* About section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-9 w-24" />
                </div>
                <div className="rounded-lg p-6 border">
                  <Skeleton className="h-24 w-full" />
                </div>
              </section>

              {/* Availability and Rate */}
              <section>
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg p-6 border">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8" />
                      <div>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg p-6 border">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8" />
                      <div>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Profile Statistics */}
              <section>
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg p-6 border">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8" />
                        <div>
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-4 w-32 mt-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
