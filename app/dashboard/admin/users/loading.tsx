import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"

export default function UsersLoading() {
  return (
    <DashboardLayout userType="admin">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>
                    <Skeleton className="h-5 w-[100px]" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[60px] mb-1" />
                  <Skeleton className="h-4 w-[140px]" />
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-[300px]" />

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[350px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Skeleton className="h-10 w-full max-w-sm" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-[130px]" />
                    <Skeleton className="h-8 w-[130px]" />
                    <Skeleton className="h-8 w-[130px]" />
                    <Skeleton className="h-8 w-[80px]" />
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="p-4">
                    <div className="flex items-center gap-4 py-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-[200px]" />
                      <Skeleton className="h-6 w-[80px]" />
                      <Skeleton className="h-6 w-[80px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-8 w-8 ml-auto" />
                    </div>
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <div key={i} className="flex items-center gap-4 py-4 border-t">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-[200px]" />
                          <Skeleton className="h-6 w-[80px]" />
                          <Skeleton className="h-6 w-[80px]" />
                          <Skeleton className="h-6 w-[100px]" />
                          <Skeleton className="h-6 w-[100px]" />
                          <Skeleton className="h-6 w-[100px]" />
                          <Skeleton className="h-8 w-8 ml-auto" />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <Skeleton className="h-5 w-[200px]" />
                  <Skeleton className="h-8 w-[300px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
