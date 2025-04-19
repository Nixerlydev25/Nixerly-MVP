import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <Skeleton className="h-8 w-[250px] mb-2" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="general" disabled>
            General
          </TabsTrigger>
          <TabsTrigger value="users" disabled>
            User Management
          </TabsTrigger>
          <TabsTrigger value="email" disabled>
            Email
          </TabsTrigger>
          <TabsTrigger value="security" disabled>
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[180px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
              </div>

              <Skeleton className="h-[1px] w-full" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[250px]" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
