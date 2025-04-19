import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function BlogManagementLoading() {
  return (
    <DashboardLayout userType="admin">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>

        <div className="space-y-4">
          <div className="rounded-md border p-6 space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4">
              <Skeleton className="h-10 w-full md:w-[300px]" />
              <div className="flex flex-col gap-2 md:flex-row">
                <Skeleton className="h-10 w-full md:w-[200px]" />
                <Skeleton className="h-10 w-full md:w-[200px]" />
              </div>
            </div>

            <div className="space-y-2 pt-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
            </div>
          </div>

          <div className="rounded-md border p-6 space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />

            <div className="grid gap-4 md:grid-cols-3 pt-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
