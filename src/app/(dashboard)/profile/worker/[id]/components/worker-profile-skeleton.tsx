export function FreelancerProfileSkeleton() {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 inline-flex items-center text-sm font-medium text-gray-400 animate-pulse">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
  
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content skeleton */}
          <div className="space-y-8">
            {/* Profile header skeleton */}
            <div className="relative rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 sm:flex-row animate-pulse">
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-full bg-gray-200"></div>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="h-7 w-48 bg-gray-200 rounded"></div>
                  <div className="h-5 w-36 bg-gray-200 rounded"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
  
            {/* Tabs skeleton */}
            <div className="space-y-4">
              <div className="flex gap-4 border-b pb-2">
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
  
              {/* Content sections skeleton */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                  </div>
                  {i === 3 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  )}
                  {i === 4 && (
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="h-8 w-20 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
  
          {/* Sidebar skeleton */}
          <div>
            <div className="sticky top-24 rounded-lg border p-6 shadow-sm animate-pulse">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="h-8 w-24 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                </div>
  
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-px w-full bg-gray-200"></div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
  
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  