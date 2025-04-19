"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Briefcase,
  FileText,
  Award,
  ImageIcon,
  MapPin,
  Calendar,
  Plus,
  TrendingUp,
  Bell,
  CheckCircle2,
  Clock,
  Users,
  ChevronRight,
  Eye,
} from "lucide-react"

export default function ProfessionalDashboard() {
  const [profileCompletion, setProfileCompletion] = useState(35)

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Project Manager",
      company: "Dublin Construction Ltd",
      location: "Dublin, Ireland",
      type: "Full-time",
      posted: "2 days ago",
      matches: "95% match",
    },
    {
      id: 2,
      title: "Site Supervisor",
      company: "Cork Builders Group",
      location: "Cork, Ireland",
      type: "Contract",
      posted: "3 days ago",
      matches: "87% match",
    },
    {
      id: 3,
      title: "Construction Manager",
      company: "Galway Development",
      location: "Galway, Ireland",
      type: "Full-time",
      posted: "1 week ago",
      matches: "82% match",
    },
  ]

  // Sample applications
  const applications = [
    {
      id: 1,
      title: "Project Manager",
      company: "ABC Construction",
      status: "Interview",
      applied: "April 10, 2025",
      nextStep: "Interview scheduled for April 20",
    },
    {
      id: 2,
      title: "Site Engineer",
      company: "XYZ Developers",
      status: "Under Review",
      applied: "April 5, 2025",
      nextStep: "Waiting for employer response",
    },
  ]

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-gray-50 dark:bg-gray-900">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2962cb] to-[#a8c0e9] p-6 text-white shadow-lg">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
                <p className="mt-1 text-white/90">Your professional dashboard is ready for you.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="bg-white text-[#2962cb] hover:bg-gray-100" asChild>
                  <Link href="/dashboard/professional/profile">Complete Your Profile</Link>
                </Button>
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                  <Link href="/dashboard/professional/jobs">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Find Jobs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 shadow-sm border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#2962cb] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-[#2962cb] data-[state=active]:text-white">
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-[#2962cb] data-[state=active]:text-white"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#2962cb] data-[state=active]:text-white">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-[#2962cb] to-[#a8c0e9] text-white">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <FileText className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{profileCompletion}%</div>
                  <Progress value={profileCompletion} className="mt-2 h-2" indicatorClassName="bg-[#2962cb]" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Complete your profile to increase visibility to employers
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-[#e78267] to-[#f3a183] text-white">
                  <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                  <Briefcase className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>3 new matches this week</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Based on your profile and preferences</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <FileText className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">2</div>
                  <div className="flex items-center gap-2 mt-2">
                    {applications[0].status === "Interview" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                        <Clock className="mr-1 h-3 w-3" />
                        Interview
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">
                        <Clock className="mr-1 h-3 w-3" />
                        Under Review
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Active job applications</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-white">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">24</div>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+8 from last week</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Businesses viewed your profile this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recommended Jobs */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-[#2962cb]">Recommended Jobs</CardTitle>
                      <CardDescription>Jobs matching your skills and experience</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#2962cb] hover:text-[#2962cb]/80 hover:bg-[#2962cb]/10"
                      asChild
                    >
                      <Link href="/dashboard/professional/jobs">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    {jobListings.slice(0, 2).map((job) => (
                      <div
                        key={job.id}
                        className="group flex items-start space-x-4 rounded-md border p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#2962cb]/10 text-[#2962cb] group-hover:bg-[#2962cb] group-hover:text-white transition-colors">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none group-hover:text-[#2962cb] transition-colors">
                            {job.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="flex items-center pt-2">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{job.location}</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {job.matches}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#2962cb] text-[#2962cb] hover:bg-[#2962cb] hover:text-white"
                    asChild
                  >
                    <Link href="/dashboard/professional/jobs">View All Jobs</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Profile Completion */}
              <Card className="border-none shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-[#2962cb]">Complete Your Profile</CardTitle>
                      <CardDescription>Increase your visibility to employers</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <span className="text-[#2962cb]">{profileCompletion}%</span>
                      <Progress value={profileCompletion} className="w-16 h-2" indicatorClassName="bg-[#2962cb]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="group space-y-2 rounded-md border p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e78267]/10 text-[#e78267]">
                            <Award className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-[#e78267] transition-colors">
                            Certifications
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#e78267] hover:bg-[#e78267]/10 hover:text-[#e78267]"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Add your certifications and qualifications</p>
                    </div>

                    <div className="group space-y-2 rounded-md border p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2962cb]/10 text-[#2962cb]">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-[#2962cb] transition-colors">Portfolio</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#2962cb] hover:bg-[#2962cb]/10 hover:text-[#2962cb]"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Add photos of your work to showcase your skills</p>
                    </div>

                    <div className="group space-y-2 rounded-md border p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#6366f1]/10 text-[#6366f1]">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-[#6366f1] transition-colors">Experience</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-[#6366f1] hover:bg-[#6366f1]/10 hover:text-[#6366f1]"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Add your work history and experience</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" className="w-full bg-[#2962cb] hover:bg-[#2962cb]/90" asChild>
                    <Link href="/dashboard/professional/profile">Complete Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2962cb]">Recent Activity</CardTitle>
                <CardDescription>Your latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-md border p-4 bg-green-50 border-green-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Interview Scheduled</p>
                      <p className="text-sm text-green-700">
                        Your interview with ABC Construction has been scheduled for April 20, 2025 at 10:00 AM.
                      </p>
                      <p className="text-xs text-green-600 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-md border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2962cb]/10 text-[#2962cb]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Application Submitted</p>
                      <p className="text-sm text-muted-foreground">
                        You've successfully applied for Site Engineer at XYZ Developers.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-md border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Application Under Review</p>
                      <p className="text-sm text-muted-foreground">
                        Your application for Site Engineer at XYZ Developers is being reviewed.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-md border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Profile Viewed</p>
                      <p className="text-sm text-muted-foreground">Dublin Construction Ltd viewed your profile.</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4 mt-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2962cb]">Job Matches</CardTitle>
                <CardDescription>Jobs that match your skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <div
                      key={job.id}
                      className="group flex flex-col md:flex-row md:items-start gap-4 rounded-md border p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#2962cb]/10 text-[#2962cb] group-hover:bg-[#2962cb] group-hover:text-white transition-colors">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-lg group-hover:text-[#2962cb] transition-colors">
                            {job.title}
                          </p>
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {job.matches}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
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
                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-[#2962cb] hover:bg-[#2962cb]/90">Apply</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    className="border-[#2962cb] text-[#2962cb] hover:bg-[#2962cb] hover:text-white"
                    asChild
                  >
                    <Link href="/dashboard/professional/jobs">View All Jobs</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4 mt-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2962cb]">Your Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.length > 0 ? (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="group flex flex-col md:flex-row md:items-start gap-4 rounded-md border p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md 
                          ${
                            app.status === "Interview" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-lg group-hover:text-[#2962cb] transition-colors">
                              {app.title}
                            </p>
                            <Badge
                              className={`${
                                app.status === "Interview"
                                  ? "bg-green-100 text-green-700 hover:bg-green-200 border-0"
                                  : "bg-amber-100 text-amber-700 hover:bg-amber-200 border-0"
                              }`}
                            >
                              {app.status === "Interview" ? (
                                <Clock className="mr-1 h-3 w-3" />
                              ) : (
                                <Clock className="mr-1 h-3 w-3" />
                              )}
                              {app.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Applied on {app.applied}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground pt-2 border-t mt-2">
                            <strong>Next step:</strong> {app.nextStep}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2962cb] text-[#2962cb] hover:bg-[#2962cb] hover:text-white"
                        >
                          View Details
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                        <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No Applications Yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground max-w-md">
                        You haven't applied to any jobs yet. Browse jobs to get started.
                      </p>
                      <Button className="mt-4 bg-[#2962cb] hover:bg-[#2962cb]/90" asChild>
                        <Link href="/dashboard/professional/jobs">Browse Jobs</Link>
                      </Button>
                    </div>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    className="border-[#2962cb] text-[#2962cb] hover:bg-[#2962cb] hover:text-white"
                    asChild
                  >
                    <Link href="/dashboard/professional/applications">View All Applications</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#2962cb]">Your Profile</CardTitle>
                <CardDescription>Manage your professional profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                    <div className="relative h-24 w-24 rounded-full bg-[#2962cb]/10 mb-4 sm:mb-0 overflow-hidden border-4 border-white shadow-md">
                      <img src="/mystical-forest-spirit.png" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <h3 className="text-xl font-bold">John Doe</h3>
                      <p className="text-[#2962cb]">Project Manager</p>
                      <div className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        Dublin, Ireland
                      </div>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                        <Button
                          variant="outline"
                          className="border-[#2962cb] text-[#2962cb] hover:bg-[#2962cb] hover:text-white"
                          asChild
                        >
                          <Link href="/dashboard/professional/profile">Edit Profile</Link>
                        </Button>
                        <Button variant="outline">Preview</Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-[#2962cb]">Profile Completion</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-md border p-3 bg-green-50 border-green-100">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-600">
                              <FileText className="h-4 w-4" />
                            </div>
                            <span>Basic Information</span>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-600 border-green-200">
                            Completed
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#e78267]/10 text-[#e78267]">
                              <Award className="h-4 w-4" />
                            </div>
                            <span>Skills & Certifications</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-600 border-amber-200">
                            Incomplete
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2962cb]/10 text-[#2962cb]">
                              <Briefcase className="h-4 w-4" />
                            </div>
                            <span>Work Experience</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-600 border-amber-200">
                            Incomplete
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#6366f1]/10 text-[#6366f1]">
                              <ImageIcon className="h-4 w-4" />
                            </div>
                            <span>Portfolio</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-600 border-amber-200">
                            Incomplete
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#2962cb] hover:bg-[#2962cb]/90" asChild>
                  <Link href="/dashboard/professional/profile">Complete Your Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
