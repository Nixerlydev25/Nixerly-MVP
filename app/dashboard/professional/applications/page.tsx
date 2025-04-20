"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  Clock,
  FileText,
  MoreHorizontal,
  PanelRightOpen,
  Pencil,
  Rocket,
  SendHorizonal,
  ThumbsUp,
  X,
  XCircle,
  Star,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardLayout from "@/components/dashboard-layout"

export default function ApplicationsPage() {
  const applications = [
    {
      id: "app-123",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Innovations Ltd",
      location: "Dublin, Ireland",
      status: "interview",
      applied: "2023-06-15",
      lastUpdated: "2023-06-25",
      nextStep: "Second interview scheduled for July 5th",
      description:
        "Applied for a senior frontend role focusing on React and TypeScript. The company is working on innovative fintech solutions.",
      notes: "Received positive feedback on portfolio. Need to prepare for system design questions in the next round.",
      timeline: [
        {
          date: "2023-06-15",
          event: "Application submitted",
          status: "complete",
        },
        {
          date: "2023-06-18",
          event: "Application reviewed",
          status: "complete",
        },
        {
          date: "2023-06-22",
          event: "First interview",
          status: "complete",
        },
        {
          date: "2023-07-05",
          event: "Second interview",
          status: "pending",
        },
        {
          date: "2023-07-12",
          event: "Final decision",
          status: "upcoming",
        },
      ],
    },
    {
      id: "app-124",
      jobTitle: "Full Stack Developer",
      company: "Global Solutions Inc",
      location: "Remote (EU)",
      status: "applied",
      applied: "2023-06-20",
      lastUpdated: "2023-06-20",
      nextStep: "Waiting for application review",
      description:
        "Applied for a full stack position working with Node.js and React. The role involves building scalable web applications for enterprise clients.",
      notes: "The job posting mentioned strong SQL skills, which align well with my experience.",
      timeline: [
        {
          date: "2023-06-20",
          event: "Application submitted",
          status: "complete",
        },
        {
          date: "TBD",
          event: "Application review",
          status: "upcoming",
        },
      ],
    },
    {
      id: "app-125",
      jobTitle: "DevOps Engineer",
      company: "Cloudify Systems",
      location: "Galway, Ireland",
      status: "rejected",
      applied: "2023-06-10",
      lastUpdated: "2023-06-17",
      nextStep: "Application closed",
      description:
        "Applied for a DevOps role focused on AWS and CI/CD pipelines. The company specializes in cloud migration services.",
      notes: "Received feedback that they were looking for someone with more Kubernetes experience.",
      timeline: [
        {
          date: "2023-06-10",
          event: "Application submitted",
          status: "complete",
        },
        {
          date: "2023-06-15",
          event: "Application reviewed",
          status: "complete",
        },
        {
          date: "2023-06-17",
          event: "Application rejected",
          status: "complete",
        },
      ],
    },
    {
      id: "app-126",
      jobTitle: "Backend Developer",
      company: "FinTech Solutions",
      location: "Cork, Ireland",
      status: "offer",
      applied: "2023-06-05",
      lastUpdated: "2023-06-28",
      nextStep: "Review offer by July 10th",
      description:
        "Applied for a backend role working with Python and Django. The position involves building financial APIs and integrations.",
      notes: "Received an offer with good compensation, but considering negotiating for more flexible working hours.",
      timeline: [
        {
          date: "2023-06-05",
          event: "Application submitted",
          status: "complete",
        },
        {
          date: "2023-06-08",
          event: "Application reviewed",
          status: "complete",
        },
        {
          date: "2023-06-12",
          event: "First interview",
          status: "complete",
        },
        {
          date: "2023-06-19",
          event: "Technical assessment",
          status: "complete",
        },
        {
          date: "2023-06-25",
          event: "Final interview",
          status: "complete",
        },
        {
          date: "2023-06-28",
          event: "Offer received",
          status: "complete",
        },
        {
          date: "2023-07-10",
          event: "Decision deadline",
          status: "upcoming",
        },
      ],
    },
  ]

  // Filter active vs archived applications
  const activeApplications = applications.filter(
    (app) => app.status !== "rejected" && app.status !== "withdrawn"
  )
  const archivedApplications = applications.filter(
    (app) => app.status === "rejected" || app.status === "withdrawn"
  )

  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)
  const selectedApplication = applications.find((app) => app.id === selectedApplicationId)

  // Get status icon based on application status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <SendHorizonal className="h-4 w-4 text-blue-500" />
      case "interview":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "offer":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "withdrawn":
        return <X className="h-4 w-4 text-gray-500" />
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  // Get status color based on application status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "interview":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "offer":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "withdrawn":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "accepted":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  // Get timeline connector color based on status
  const getTimelineConnectorColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "upcoming":
        return "bg-gray-200"
      default:
        return "bg-gray-200"
    }
  }

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 p-6 md:p-8 pt-6 bg-blue-50">
        {/* Applications Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-xl mb-6 animate-fade-in">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-15 mix-blend-overlay bg-pattern"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Job Applications</h2>
                <p className="mt-1 text-white">Manage and track your job application progress</p>
              </div>
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                <Rocket className="mr-2 h-4 w-4" />
                Quick Apply
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList className="bg-white p-1 shadow-md border border-blue-200 rounded-xl">
            <TabsTrigger value="active" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Active Applications
            </TabsTrigger>
            <TabsTrigger value="archived" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Archived Applications
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <TabsContent value="active" className="mt-0 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-800">Active Applications ({activeApplications.length})</h3>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <span className="hidden sm:inline mr-2">Filter Applications</span>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>

                {activeApplications.map((application) => (
                  <Card
                    key={application.id}
                    className={`border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white ${
                      selectedApplicationId === application.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedApplicationId(application.id)}
                  >
                    <CardHeader className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-bold text-blue-800">{application.jobTitle}</CardTitle>
                          <CardDescription className="text-blue-700">{application.company} • {application.location}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(application.status)} transition-colors duration-200`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            <span className="capitalize">
                              {application.status === "interview" ? "Interviewing" : application.status}
                            </span>
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-3">
                      <div className="text-sm">
                        <div className="flex justify-between text-blue-700 mb-2">
                          <div>
                            <span className="font-medium">Applied:</span> {new Date(application.applied).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Last Updated:</span>{" "}
                            {new Date(application.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-blue-700">
                          <span className="font-medium">Next Step:</span> {application.nextStep}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-5 py-3 border-t border-blue-100 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <Pencil className="h-4 w-4 mr-1" /> Add Notes
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-blue-200">
                          <DropdownMenuLabel className="text-blue-800">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-blue-100" />
                          <DropdownMenuItem className="text-blue-700 cursor-pointer hover:bg-blue-50">
                            View Job Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-blue-700 cursor-pointer hover:bg-blue-50">
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-blue-700 cursor-pointer hover:bg-blue-50">
                            Send Follow-up
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-blue-100" />
                          <DropdownMenuItem className="text-red-500 cursor-pointer hover:bg-red-50">
                            Withdraw Application
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="archived" className="mt-0 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-800">Archived Applications ({archivedApplications.length})</h3>
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <span className="hidden sm:inline mr-2">Filter Applications</span>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>

                {archivedApplications.map((application) => (
                  <Card
                    key={application.id}
                    className={`border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white ${
                      selectedApplicationId === application.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedApplicationId(application.id)}
                  >
                    <CardHeader className="p-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-bold text-blue-800">{application.jobTitle}</CardTitle>
                          <CardDescription className="text-blue-700">{application.company} • {application.location}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(application.status)} transition-colors duration-200`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            <span className="capitalize">{application.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-3">
                      <div className="text-sm">
                        <div className="flex justify-between text-blue-700 mb-2">
                          <div>
                            <span className="font-medium">Applied:</span> {new Date(application.applied).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Last Updated:</span>{" "}
                            {new Date(application.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-blue-700">
                          <span className="font-medium">Next Step:</span> {application.nextStep}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-5 py-3 border-t border-blue-100 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <Star className="h-4 w-4 mr-1" /> Save Job
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <FileText className="h-4 w-4 mr-1" /> View Feedback
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </div>

            <div className="hidden md:block">
              <Card className="border-blue-200 rounded-xl shadow-lg h-full bg-white">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-blue-800">Application Details</CardTitle>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                      <PanelRightOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedApplication ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800">{selectedApplication.jobTitle}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-blue-100 text-blue-800 text-sm">
                              {selectedApplication.company.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-blue-700">{selectedApplication.company}</p>
                        </div>
                        <Badge className={`mt-3 ${getStatusColor(selectedApplication.status)}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(selectedApplication.status)}
                            <span className="capitalize">
                              {selectedApplication.status === "interview" ? "Interviewing" : selectedApplication.status}
                            </span>
                          </div>
                        </Badge>
                      </div>

                      <Separator className="bg-blue-100" />

                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-800">Description</h4>
                        <p className="text-sm text-blue-700">{selectedApplication.description}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-blue-800">Notes</h4>
                        <p className="text-sm text-blue-700">{selectedApplication.notes}</p>
                      </div>

                      <Separator className="bg-blue-100" />

                      <div className="space-y-3">
                        <h4 className="font-medium text-blue-800">Application Timeline</h4>
                        <ScrollArea className="h-[300px] pr-4">
                          <div className="space-y-3">
                            {selectedApplication.timeline.map((item, index) => (
                              <div key={index} className="relative pl-6">
                                {index !== selectedApplication.timeline.length - 1 && (
                                  <div
                                    className={`absolute left-[9px] top-6 h-full w-0.5 ${getTimelineConnectorColor(
                                      item.status
                                    )}`}
                                  />
                                )}
                                <div className="flex items-start">
                                  <div
                                    className={`absolute left-0 rounded-full h-[18px] w-[18px] flex items-center justify-center ${
                                      item.status === "complete"
                                        ? "bg-green-500"
                                        : item.status === "pending"
                                        ? "bg-yellow-100 border border-yellow-500"
                                        : "bg-gray-100 border border-gray-300"
                                    }`}
                                  >
                                    {item.status === "complete" && (
                                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                                    )}
                                  </div>
                                  <div className="ml-2 space-y-1">
                                    <p className="text-sm font-medium text-blue-800">{item.event}</p>
                                    <p className="text-xs text-blue-700">{item.date}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <Separator className="bg-blue-100" />

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">Update Status</Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                          Add Note
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-center p-4">
                      <FileText className="h-12 w-12 text-blue-300 mb-4" />
                      <h3 className="text-lg font-medium text-blue-800 mb-1">No Application Selected</h3>
                      <p className="text-sm text-blue-700">
                        Select an application from the list to view its details.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
