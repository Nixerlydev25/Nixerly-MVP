import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, ChevronLeft, Globe, GraduationCap } from "lucide-react"

export default function FreelancerProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to dashboard */}
        <Link href="/feed" className="mb-6 inline-flex items-center text-sm font-medium text-blue-600">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to dFeed
        </Link>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 md:col-span-2">
            {/* Profile header skeleton */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 shadow-sm border border-blue-100">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>

              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <Skeleton className="h-[120px] w-[120px] rounded-full" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-6 w-64" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-32" />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs skeleton */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="work">Work Experiences</TabsTrigger>
              </TabsList>

              <Separator className="mt-6" />

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 pt-6">
                {/* About section skeleton */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="border-b pb-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </section>

                {/* Skills section skeleton */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-7 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="border-b pb-6">
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-20" />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Languages skeleton */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-green-600" />
                      <Skeleton className="h-7 w-24" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education & Certifications skeleton */}
                <div className="grid gap-8">
                  {/* Education skeleton */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                        <Skeleton className="h-7 w-24" />
                      </div>
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <div className="bg-white rounded-lg p-5">
                      <div className="space-y-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div key={i} className={i > 0 ? "border-t pt-4" : ""}>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-5 w-64 mb-1" />
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Certifications skeleton */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-purple-600" />
                        <Skeleton className="h-7 w-32" />
                      </div>
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <div className="space-y-4">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg p-5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-6 w-48" />
                              <Skeleton className="h-6 w-20" />
                            </div>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-36" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </TabsContent>

              {/* Work History Tab skeleton */}
              <TabsContent value="work" className="space-y-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Skeleton className="h-7 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-9 w-36" />
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className={i > 0 ? "border-t pt-6 mt-6" : ""}>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-5 w-40" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6 md:order-2">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 space-y-4">
                <div className="text-center space-y-2">
                  <Skeleton className="h-8 w-20 mx-auto" />
                  <Skeleton className="h-5 w-16 mx-auto" />
                </div>

                <Separator />

                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
