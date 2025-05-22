"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Building2, Calendar, Clock, MapPin, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useListMyJobs } from "@/hook/jobs/jobs.hooks"
import { ROUTES } from "@/lib/routes"
import JobsSkeleton from "./_components/jobs-skeleton"

interface JobApplicant {
  id: string
  // Add other applicant properties as needed
}

interface Job {
  id: string
  title: string
  status: string
  employmentType: string
  createdAt: string
  businessProfile?: {
    companyName: string
    city: string
    state: string
  }
  applicants?: JobApplicant[]
}

export default function BusinessDashboard() {
  const router = useRouter()
  const { data, isLoading } = useListMyJobs()
  const jobs = data?.jobs as Job[] | undefined
  const [searchQuery, setSearchQuery] = useState("")

  // Filter jobs based on search query only
  const filteredJobs = jobs?.filter((job: Job) => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleJobClick = (jobId: string) => {
    router.push(`${ROUTES.MY_JOBS}/${jobId}`)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <JobsSkeleton />
        </div>
      </div>
    )
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your job postings and applicants</p>
        </div>
        <Button onClick={()=> router.push(ROUTES.POST_A_JOB)} >
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{data?.jobStatusCounts?.open}</p>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{data?.totalCount}</p>
              </div>
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time to Fill</p>
                <p className="text-2xl font-bold">14 days</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <TabsList className="mb-2 md:mb-0">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-4">
              {filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((job: Job) => (
                  <Card
                    key={job.id}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleJobClick(job.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <Badge variant={job.status === "open" ? "default" : "secondary"}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              <span>{job.businessProfile?.companyName}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>
                                {job.businessProfile?.city}, {job.businessProfile?.state}
                              </span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">
                              {job.applicants?.length || 0} applicant{job.applicants?.length !== 1 ? "s" : ""}
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {job.employmentType}
                            </Badge>
                          </div>
                          <div className="mt-2 md:mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/business/jobs/${job.id}/edit`)
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="open" className="mt-0">
            {/* Similar content but filtered for open jobs */}
          </TabsContent>
          <TabsContent value="closed" className="mt-0">
            {/* Similar content but filtered for closed jobs */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
