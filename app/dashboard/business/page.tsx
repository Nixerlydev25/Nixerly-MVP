"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import { Users, FileText, Building, Search, Plus, User, MapPin, Briefcase } from "lucide-react"

export default function BusinessDashboard() {
  const [profileCompletion, setProfileCompletion] = useState(50)

  // Sample professionals
  const professionals = [
    {
      id: 1,
      name: "Michael O'Connor",
      title: "Senior Project Manager",
      location: "Dublin, Ireland",
      experience: "10+ years",
      skills: ["Project Management", "Team Leadership", "Budgeting"],
      match: "95% match",
    },
    {
      id: 2,
      name: "Sarah Murphy",
      title: "Civil Engineer",
      location: "Cork, Ireland",
      experience: "8 years",
      skills: ["Structural Design", "Site Inspection", "AutoCAD"],
      match: "87% match",
    },
    {
      id: 3,
      name: "David Kelly",
      title: "Construction Supervisor",
      location: "Galway, Ireland",
      experience: "12 years",
      skills: ["Site Management", "Health & Safety", "Quality Control"],
      match: "82% match",
    },
  ]

  // Sample job postings
  const jobPostings = [
    {
      id: 1,
      title: "Project Manager",
      location: "Dublin, Ireland",
      type: "Full-time",
      posted: "April 10, 2025",
      applicants: 12,
      status: "Active",
    },
    {
      id: 2,
      title: "Site Engineer",
      location: "Cork, Ireland",
      type: "Contract",
      posted: "April 5, 2025",
      applicants: 8,
      status: "Active",
    },
  ]

  return (
    <DashboardLayout userType="business">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Business Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/dashboard/business/post-job">Post a Job</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{profileCompletion}%</div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${profileCompletion}%` }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Complete your company profile to attract professionals
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Currently active job postings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">20</div>
                  <p className="text-xs text-muted-foreground">Across all active job postings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Premium</div>
                  <p className="text-xs text-muted-foreground">Valid until May 15, 2025</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recommended Professionals</CardTitle>
                  <CardDescription>Professionals matching your job requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {professionals.slice(0, 2).map((professional) => (
                      <div key={professional.id} className="flex items-start space-x-4 rounded-md border p-3">
                        <User className="mt-px h-5 w-5 text-primary" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{professional.name}</p>
                          <p className="text-sm text-muted-foreground">{professional.title}</p>
                          <div className="flex items-center pt-2">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{professional.location}</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-600">{professional.match}</div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/dashboard/business/professionals">View All Professionals</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Your Job Postings</CardTitle>
                  <CardDescription>Manage your active job listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobPostings.map((job) => (
                      <div key={job.id} className="flex items-start space-x-4 rounded-md border p-3">
                        <Briefcase className="mt-px h-5 w-5 text-primary" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{job.title}</p>
                          <div className="flex items-center pt-2">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{job.location}</span>
                          </div>
                          <div className="flex items-center pt-1">
                            <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{job.applicants} applicants</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-600">{job.status}</div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/dashboard/business/jobs">Manage Jobs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="professionals" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Find Professionals</CardTitle>
                  <CardDescription>Search for construction professionals based on skills and location</CardDescription>
                </div>
                <Button size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Advanced Search
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {professionals.map((professional) => (
                    <div key={professional.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{professional.name}</p>
                          <span className="text-xs font-medium text-green-600">{professional.match}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{professional.title}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{professional.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{professional.experience}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {professional.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button size="sm">View Profile</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Job Postings</CardTitle>
                  <CardDescription>Manage your active and past job listings</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/business/post-job">
                    <Plus className="mr-2 h-4 w-4" />
                    Post New Job
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobPostings.length > 0 ? (
                    jobPostings.map((job) => (
                      <div key={job.id} className="flex items-start space-x-4 rounded-md border p-4">
                        <Briefcase className="mt-px h-5 w-5 text-primary" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{job.title}</p>
                            <span
                              className={`text-xs font-medium ${
                                job.status === "Active" ? "text-green-600" : "text-amber-600"
                              }`}
                            >
                              {job.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{job.type}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{job.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Applicants
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Briefcase className="h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">No Job Postings Yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You haven't posted any jobs yet. Create your first job posting to start finding professionals.
                      </p>
                      <Button className="mt-4" asChild>
                        <Link href="/dashboard/business/post-job">Post a Job</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Manage your company information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                    <div className="relative h-24 w-24 rounded-md bg-gray-200 mb-4 sm:mb-0">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">Add Logo</div>
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <h3 className="text-xl font-bold">Acme Construction Ltd</h3>
                      <p className="text-muted-foreground">Building Excellence Since 2010</p>
                      <p className="text-sm text-muted-foreground">Dublin, Ireland</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/dashboard/business/company">Edit Profile</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Profile Sections</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-primary" />
                            <span>Company Information</span>
                          </div>
                          <span className="text-xs text-green-600">Completed</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>Company Description</span>
                          </div>
                          <span className="text-xs text-green-600">Completed</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>Team Members</span>
                          </div>
                          <span className="text-xs text-amber-600">Incomplete</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span>Projects & Portfolio</span>
                          </div>
                          <span className="text-xs text-amber-600">Incomplete</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Subscription Details</h4>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Premium Plan</p>
                            <p className="text-sm text-muted-foreground">Unlimited access to professional profiles</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <span className="font-medium text-green-600">Active</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Renewal Date</span>
                            <span className="font-medium">May 15, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Job Postings</span>
                            <span className="font-medium">Unlimited</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
