"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  BookmarkIcon,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Flag,
  Globe,
  GraduationCap,
  HeartIcon,
  MapPin,
  MoreHorizontal,
  Share2,
  StarIcon,
  ThumbsUp,
} from "lucide-react"
import { useGetWorkerById } from "@/hook/worker/worker.hook"
import { useParams } from "next/navigation"

// Sample freelancer data for sections that will remain static
const staticData = {
  rating: 4.9,
  jobsCompleted: 127,
  successRate: 98,
  lastActive: "2 hours ago",
  responseTime: "< 1 hour",
  avatar: "/placeholder.svg?height=200&width=200",
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2020",
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB, Inc.",
      year: "2019",
    },
  ],
  workHistory: [
    {
      title: "E-commerce Platform Redesign",
      client: "Fashion Retailer",
      completedDate: "March 2023",
      rating: 5.0,
      hours: 160,
      description:
        "Completely redesigned and rebuilt the client's e-commerce platform using React, Next.js, and Node.js. Implemented a headless CMS, optimized performance, and integrated with payment gateways.",
    },
    {
      title: "Real-time Analytics Dashboard",
      client: "SaaS Company",
      completedDate: "November 2022",
      rating: 4.9,
      hours: 120,
      description:
        "Developed a real-time analytics dashboard using React, D3.js, and WebSockets. The dashboard provides insights into user behavior and system performance.",
    },
    {
      title: "Mobile App Backend",
      client: "Health Tech Startup",
      completedDate: "July 2022",
      rating: 5.0,
      hours: 80,
      description:
        "Built a scalable backend for a health tracking mobile app using Node.js, Express, and MongoDB. Implemented authentication, data storage, and RESTful APIs.",
    },
  ],
  reviews: [
    {
      client: "Sarah M.",
      company: "Fashion Retailer",
      rating: 5.0,
      date: "March 15, 2023",
      content:
        "Alex was exceptional to work with. He understood our requirements perfectly and delivered a solution that exceeded our expectations. His communication was clear and timely, and he was proactive in suggesting improvements to our initial design. Would definitely hire again!",
    },
    {
      client: "Michael T.",
      company: "SaaS Company",
      rating: 4.9,
      date: "November 22, 2022",
      content:
        "Working with Alex was a great experience. He's technically skilled and also understands business requirements well. The dashboard he built has become an essential tool for our team and customers. Highly recommended.",
    },
    {
      client: "Jennifer K.",
      company: "Health Tech Startup",
      rating: 5.0,
      date: "July 30, 2022",
      content:
        "Alex delivered our backend ahead of schedule and with all requirements met. He's a clear communicator and was able to explain complex technical concepts to our non-technical team members. His work is clean, well-documented, and easy to maintain.",
    },
  ],
  preferredProjectLength: "3+ months",
}

export default function FreelancerProfile() {
  const [isSaved, setIsSaved] = useState(false)
  const { id } = useParams<{ id: string }>()
  const { data: worker, isLoading } = useGetWorkerById(id)

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!worker) {
    return <div className="flex min-h-screen items-center justify-center">Worker not found</div>
  }

  // Format skills for display
  const formattedSkills = worker.skills?.map((skill: string) => {
    return skill.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())
  }) || []

  // Format full name
  const fullName = `${worker.user?.firstName || ''} ${worker.user?.lastName || ''}`.trim()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to search results */}
        <Link href="/dashboard" className="mb-6 inline-flex items-center text-sm font-medium text-blue-600">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to search results
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Profile header */}
            <div className="relative rounded-lg border bg-white p-6 shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 opacity-70"></div>
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="relative">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <Image
                      src={staticData.avatar}
                      width={120}
                      height={120}
                      alt={fullName}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                        <p className="text-lg text-gray-600">{worker.title}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1 h-4 w-4" />
                          {worker.city}, {worker.state}, {worker.country}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={isSaved ? "text-red-500" : "text-gray-400"}
                          onClick={() => setIsSaved(!isSaved)}
                        >
                          <HeartIcon className={`h-5 w-5 ${isSaved ? "fill-red-500" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Flag className="mr-2 h-4 w-4" />
                              Report this profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BookmarkIcon className="mr-2 h-4 w-4" />
                              Save to list
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{worker.description}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{worker.avgRating || staticData.rating}</span>
                        <span className="ml-1 text-gray-500">({worker.completedJobs || staticData.jobsCompleted} reviews)</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        {staticData.successRate}% Job Success
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-gray-500" />
                        <span>{staticData.responseTime} response time</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="work"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* About section */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 py-3">
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-gray-700">{worker.description}</div>
                  </CardContent>
                </Card>

                {/* Skills section */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 py-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {formattedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-200 border"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experience section */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 py-3">
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-amber-600" />
                      Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {worker.experience?.map((exp) => (
                        <div key={exp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} - 
                            {exp.currentlyWorking 
                              ? ' Present' 
                              : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString()}` : ''}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {exp.city}, {exp.state}, {exp.country}
                          </p>
                          <p className="mt-2 text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Certifications */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Education */}
                  <Card className="pt-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 py-3">
                      <CardTitle className="flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-cyan-600" />
                        Education
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {worker.education?.map((edu) => (
                          <div key={edu.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                            <h4 className="font-medium">{edu.school}</h4>
                            <p className="text-gray-600">{edu.degree} in {edu.fieldOfStudy}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(edu.startDate).toLocaleDateString()} - 
                              {edu.currentlyStudying 
                                ? ' Present' 
                                : edu.endDate ? ` ${new Date(edu.endDate).toLocaleDateString()}` : ''}
                            </p>
                            <p className="mt-2 text-gray-700">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="pt-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 py-3">
                      <CardTitle className="flex items-center">
                        <Award className="mr-2 h-5 w-5 text-purple-600" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {staticData.certifications.map((cert, index) => (
                          <div key={index} className={index > 0 ? "border-t pt-4" : ""}>
                            <h4 className="font-medium">{cert.name}</h4>
                            <p className="text-gray-600">{cert.issuer}</p>
                            <p className="text-sm text-gray-500">{cert.year}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Languages */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-3">
                    <CardTitle className="flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-green-600" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {worker.languages?.map((language) => (
                        <div key={language.id} className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{language.language.charAt(0) + language.language.slice(1).toLowerCase()}:</span>
                            <span className="ml-2 text-gray-600">{language.proficiency.charAt(0) + language.proficiency.slice(1).toLowerCase()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Work History Tab */}
              <TabsContent value="work" className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 pb-3">
                    <CardTitle>Work History</CardTitle>
                    <CardDescription>
                      Completed {worker.completedJobs || staticData.jobsCompleted} jobs with {staticData.successRate}% success rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {staticData.workHistory.map((work, index) => (
                        <div key={index} className={index > 0 ? "border-t pt-6" : ""}>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">{work.title}</h3>
                              <p className="text-gray-600">{work.client}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{work.rating.toFixed(1)}</span>
                              </div>
                              <p className="text-sm text-gray-500">{work.completedDate}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-700">{work.description}</p>
                          <div className="mt-2 text-sm text-gray-500">{work.hours} hours worked</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 pb-3">
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>
                      <div className="flex items-center">
                        <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{worker.avgRating || staticData.rating}</span>
                        <span className="ml-1 text-gray-500">({worker.completedJobs || staticData.jobsCompleted} reviews)</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {staticData.reviews.map((review, index) => (
                        <div key={index} className={index > 0 ? "border-t pt-6" : ""}>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold">
                                {review.client} <span className="font-normal text-gray-500">from {review.company}</span>
                              </h3>
                              <div className="mt-1 flex items-center">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(review.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "fill-gray-200 text-gray-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8">
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Helpful
                            </Button>
                          </div>
                          <p className="mt-3 text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hire card */}
            <div className="sticky top-24 rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600">${worker.hourlyRate}</div>
                <div className="text-gray-600">per hour</div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">{worker.availability ? "Available" : "Unavailable"}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{worker.city}, {worker.state}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last active</span>
                  <span className="font-medium">{staticData.lastActive}</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                Contact {worker.user?.firstName || "Worker"}
              </Button>
              <Button variant="outline" className="mt-3 w-full">
                Invite to Job
              </Button>
            </div>

            {/* Profile stats */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
                <CardTitle className="text-base">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Jobs Completed</span>
                    <span className="font-medium">{worker.completedJobs || staticData.jobsCompleted}</span>
                  </div>
                  <Progress value={85} className="h-2 bg-blue-100" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">On Budget</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-green-100" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">On Time</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2 bg-indigo-100" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Repeat Hire Rate</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-purple-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
