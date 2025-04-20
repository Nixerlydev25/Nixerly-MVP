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
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-blue-50">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-15 mix-blend-overlay bg-pattern"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
                <p className="mt-1 text-white">Your professional dashboard is ready for you.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="/dashboard/professional/profile">Complete Your Profile</Link>
                </Button>
                <Button variant="outline" className="bg-white/15 text-white border-white/40 hover:bg-white/25 transition-all duration-300" asChild>
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
          <TabsList className="bg-white p-1 shadow-md border border-blue-200 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  <FileText className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="text-2xl font-bold text-blue-800">{profileCompletion}%</div>
                  <Progress value={profileCompletion} className="mt-2 h-2" indicatorClassName="bg-blue-600" />
                  <p className="text-xs text-blue-800 mt-2">
                    Complete your profile to increase visibility to employers
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-coral-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-coral-600 to-coral-400 text-white">
                  <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
                  <Briefcase className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="text-2xl font-bold text-blue-800">12</div>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>3 new matches this week</span>
                  </div>
                  <p className="text-xs text-blue-800 mt-1">Based on your profile and preferences</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                  <FileText className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="text-2xl font-bold text-blue-800">2</div>
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
                  <p className="text-xs text-blue-800 mt-1">Active job applications</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-coral-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-coral-600 to-coral-400 text-white">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <Eye className="h-4 w-4 text-white" />
                </CardHeader>
                <CardContent className="pt-6 bg-white">
                  <div className="text-2xl font-bold text-blue-800">24</div>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    <span>+8 from last week</span>
                  </div>
                  <p className="text-xs text-blue-800 mt-1">Businesses viewed your profile this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recommended Jobs */}
              <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-blue-800">Recommended Jobs</CardTitle>
                      <CardDescription className="text-blue-700">Jobs matching your skills and experience</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all"
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
                        className="group flex items-start space-x-4 rounded-md border border-blue-200 p-3 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </p>
                          <p className="text-sm text-blue-700">{job.company}</p>
                          <div className="flex items-center pt-2">
                            <MapPin className="mr-1 h-3 w-3 text-blue-700" />
                            <span className="text-xs text-blue-700">{job.location}</span>
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
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    asChild
                  >
                    <Link href="/dashboard/professional/jobs">View All Jobs</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Profile Completion */}
              <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-blue-800">Complete Your Profile</CardTitle>
                      <CardDescription className="text-blue-700">Increase your visibility to employers</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <span className="text-blue-600">{profileCompletion}%</span>
                      <Progress value={profileCompletion} className="w-16 h-2" indicatorClassName="bg-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="group space-y-2 rounded-md border border-blue-200 p-3 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-coral-100 text-coral-600">
                            <Award className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-coral-600 transition-colors">
                            Certifications
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-coral-600 hover:bg-coral-100 hover:text-coral-800 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-blue-700">Add your certifications and qualifications</p>
                    </div>

                    <div className="group space-y-2 rounded-md border border-blue-200 p-3 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-blue-600 transition-colors">Portfolio</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-blue-700">Add photos of your work to showcase your skills</p>
                    </div>

                    <div className="group space-y-2 rounded-md border border-blue-200 p-3 hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-coral-100 text-coral-600">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <span className="font-medium group-hover:text-coral-600 transition-colors">Experience</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-coral-600 hover:bg-coral-100 hover:text-coral-800 transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-blue-700">Add your work history and experience</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]" asChild>
                    <Link href="/dashboard/professional/profile">Complete Profile</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Recent Activity</CardTitle>
                <CardDescription className="text-blue-700">Your latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-md border border-green-200 p-4 bg-green-50">
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

                  <div className="flex items-start gap-4 rounded-md border border-blue-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">Application Submitted</p>
                      <p className="text-sm text-blue-700">
                        You've successfully applied for Site Engineer at XYZ Developers.
                      </p>
                      <p className="text-xs text-blue-600 mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-md border border-amber-200 p-4 bg-amber-50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-amber-800">Application Under Review</p>
                      <p className="text-sm text-amber-700">
                        Your application for Site Engineer at XYZ Developers is being reviewed.
                      </p>
                      <p className="text-xs text-amber-600 mt-1">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-md border border-blue-200 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-800">Profile Viewed</p>
                      <p className="text-sm text-blue-700">Dublin Construction Ltd viewed your profile.</p>
                      <p className="text-xs text-blue-600 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Job Matches</CardTitle>
                <CardDescription className="text-blue-700">Jobs that match your skills and experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <div
                      key={job.id}
                      className="group flex flex-col md:flex-row md:items-start gap-4 rounded-md border border-blue-200 p-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </p>
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            {job.matches}
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">{job.company}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-700">{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-700">{job.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-700">Posted {job.posted}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">Apply</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Your Applications</CardTitle>
                <CardDescription className="text-blue-700">Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="group flex flex-col md:flex-row md:items-start gap-4 rounded-md border border-blue-200 p-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-lg group-hover:text-blue-600 transition-colors">
                            {application.title}
                          </p>
                          {application.status === "Interview" ? (
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
                        <p className="text-sm text-blue-700">{application.company}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-700">Applied: {application.applied}</span>
                          </div>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">{application.nextStep}</p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">View Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Profile Overview</CardTitle>
                <CardDescription className="text-blue-700">
                  Your profile is {profileCompletion}% complete
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-blue-800">Complete your profile</h3>
                      <p className="text-sm text-blue-700">
                        A complete profile increases your chances of getting noticed by employers
                      </p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]" asChild>
                      <Link href="/dashboard/professional/profile">Edit Profile</Link>
                    </Button>
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
