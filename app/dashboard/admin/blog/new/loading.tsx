import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"

export default function NewBlogPostLoading() {
  return (
    <DashboardLayout userType="admin">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-[250px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-md border p-6 space-y-4">
              <Skeleton className="h-8 w-full" />

              <div className="space-y-2">
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-8 w-[150px]" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>

            <div className="rounded-md border p-6 space-y-4">
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-4 w-[250px]" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border p-6 space-y-4">
              <Skeleton className="h-8 w-[150px]" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>

              <Skeleton className="h-px w-full" />

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[100px]" />
                <Skeleton className="h-6 w-10" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-6 w-10" />
              </div>
            </div>

            <div className="rounded-md border p-6 space-y-4">
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
