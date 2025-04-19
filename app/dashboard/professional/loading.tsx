import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function Loading() {
  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-gray-50 dark:bg-gray-900">
        {/* Welcome Banner Skeleton */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-nixerly-blue/40 to-nixerly-lightblue/40 p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-10 w-96" />

          {/* Stats Cards Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border shadow-md overflow-hidden">
                <div className="h-12 bg-gray-200" />
                <div className="p-6 space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            ))}
          </div>

          {/* Two Column Layout Skeleton */}
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border shadow-md overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map((j) => (
                      <div key={j} className="flex gap-4 border rounded-md p-3">
                        <Skeleton className="h-10 w-10 rounded-md" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-36" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity Skeleton */}
          <div className="rounded-lg border shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 border rounded-md p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-36" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
