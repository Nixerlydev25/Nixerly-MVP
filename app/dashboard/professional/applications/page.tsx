"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/dashboard-layout"
import {
  FileText,
  Building,
  MapPin,
  Calendar,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function ApplicationsPage() {
  // Sample applications data
  const applications = [
    {
      id: 1,
      jobTitle: "Project Manager",
      company: "ABC Construction",
      location: "Dublin, Ireland",
      status: "Interview",
      statusColor: "green",
      applied: "April 10, 2025",
      lastUpdated: "April 15, 2025",
      nextStep: "Interview scheduled for April 20, 2025 at 10:00 AM",
      description:
        "Leading a team of 10-15 professionals on commercial construction projects with budgets exceeding €2 million.",
      notes: "Prepare portfolio of past projects. Research company's recent developments.",
      timeline: [
        { date: "April 10, 2025", event: "Application submitted", status: "complete" },
        { date: "April 12, 2025", event: "Application reviewed", status: "complete" },
        { date: "April 15, 2025", event: "Interview invitation sent", status: "complete" },
        { date: "April 20, 2025", event: "Interview", status: "upcoming" },
        { date: "April 25, 2025", event: "Decision", status: "pending" },
      ],
    },
    {
      id: 2,
      jobTitle: "Site Engineer",
      company: "XYZ Developers",
      location: "Cork, Ireland",
      status: "Under Review",
      statusColor: "amber",
      applied: "April 5, 2025",
      lastUpdated: "April 5, 2025",
      nextStep: "Waiting for employer response",
      description:
        "Overseeing construction activities, ensuring compliance with design specifications and building codes.",
      notes: "Follow up if no response by April 19.",
      timeline: [
        { date: "April 5, 2025", event: "Application submitted", status: "complete" },
        { date: "April 8, 2025", event: "Application review", status: "in-progress" },
        { date: "TBD", event: "Interview", status: "pending" },
        { date: "TBD", event: "Decision", status: "pending" },
      ],
    },
    {
      id: 3,
      jobTitle: "Construction Manager",
      company: "Dublin Builders Ltd",
      location: "Dublin, Ireland",
      status: "Rejected",
      statusColor: "red",
      applied: "March 25, 2025",
      lastUpdated: "April 8, 2025",
      nextStep: "Application closed",
      description:
        "Managing construction projects from inception to completion, ensuring they are delivered on time and within budget.",
      notes: "Received feedback: They were looking for someone with more experience in healthcare construction.",
      timeline: [
        { date: "March 25, 2025", event: "Application submitted", status: "complete" },
        { date: "April 1, 2025", event: "Application reviewed", status: "complete" },
        { date: "April 8, 2025", event: "Application rejected", status: "complete" },
      ],
    },
    {
      id: 4,
      jobTitle: "Health & Safety Officer",
      company: "Safety First Construction",
      location: "Galway, Ireland",
      status: "Offer",
      statusColor: "blue",
      applied: "March 20, 2025",
      lastUpdated: "April 12, 2025",
      nextStep: "Review and respond to offer by April 19, 2025",
      description: "Ensuring compliance with health and safety regulations across multiple construction sites.",
      notes: "Offer: €55,000 per year with benefits. Need to negotiate start date.",
      timeline: [
        { date: "March 20, 2025", event: "Application submitted", status: "complete" },
        { date: "March 25, 2025", event: "Application reviewed", status: "complete" },
        { date: "April 2, 2025", event: "Phone screening", status: "complete" },
        { date: "April 8, 2025", event: "In-person interview", status: "complete" },
        { date: "April 12, 2025", event: "Offer extended", status: "complete" },
        { date: "April 19, 2025", event: "Decision deadline", status: "upcoming" },
      ],
    },
  ]

  // Filter applications by status
  const activeApplications = applications.filter((app) => ["Interview", "Under Review", "Offer"].includes(app.status))
  const archivedApplications = applications.filter((app) => ["Rejected", "Withdrawn", "Declined"].includes(app.status))

  const [selectedApplication, setSelectedApplication] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Interview":
        return <Clock className="h-4 w-4 text-green-500" />
      case "Under Review":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Offer":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-500"
      case "in-progress":
        return "bg-amber-500"
      case "upcoming":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  const getTimelineConnectorColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-green-500"
      case "in-progress":
        return "border-amber-500"
      case "upcoming":
        return "border-blue-500"
      default:
        return "border-gray-300"
    }
  }

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Applications</h2>
          <Button asChild>
            <Link href="/dashboard/professional/jobs">Find More Jobs</Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active ({activeApplications.length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({archivedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeApplications.length > 0 ? (
              activeApplications.map((app) => (
                <Card key={app.id} className={selectedApplication === app.id ? "border-primary" : ""}>
                  <CardContent className="p-0">
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setSelectedApplication(selectedApplication === app.id ? null : app.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{app.jobTitle}</h3>
                            <Badge
                              variant={app.statusColor === "green" ? "default" : "outline"}
                              className={`${
                                app.statusColor === "amber"
                                  ? "text-amber-500 border-amber-500"
                                  : app.statusColor === "red"
                                    ? "text-red-500 border-red-500"
                                    : app.statusColor === "blue"
                                      ? "text-blue-500 border-blue-500"
                                      : ""
                              }`}
                            >
                              {app.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="mr-1 h-4 w-4" />
                              {app.company}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {app.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              Applied on {app.applied}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Next step:</strong> {app.nextStep}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${selectedApplication === app.id ? "transform rotate-90" : ""}`}
                          />
                        </div>
                      </div>

                      {selectedApplication === app.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Job Description</h4>
                              <p className="text-sm text-muted-foreground">{app.description}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Your Notes</h4>
                              <p className="text-sm text-muted-foreground">{app.notes}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Application Timeline</h4>
                              <div className="relative">
                                {app.timeline.map((event, index) => (
                                  <div key={index} className="flex gap-4 mb-4">
                                    <div className="relative">
                                      <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
                                      {index < app.timeline.length - 1 && (
                                        <div
                                          className={`absolute top-3 left-1.5 w-0 h-full -ml-px border-l-2 ${getTimelineConnectorColor(event.status)}`}
                                        ></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{event.event}</p>
                                      <p className="text-xs text-muted-foreground">{event.date}</p>
                                    </div>
                                    <div className="text-xs">
                                      {event.status === "complete" && (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      )}
                                      {event.status === "in-progress" && <Clock className="h-4 w-4 text-amber-500" />}
                                      {event.status === "upcoming" && <Calendar className="h-4 w-4 text-blue-500" />}
                                      {event.status === "pending" && <AlertCircle className="h-4 w-4 text-gray-300" />}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline">Add Note</Button>
                              <Button variant="outline">Contact Employer</Button>
                              <Button variant="outline" className="text-red-500 hover:text-red-600">
                                Withdraw Application
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No Active Applications</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    You don't have any active job applications at the moment. Start applying to jobs to track your
                    progress here.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/professional/jobs">Browse Jobs</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
            {archivedApplications.length > 0 ? (
              archivedApplications.map((app) => (
                <Card key={app.id} className={selectedApplication === app.id ? "border-primary" : ""}>
                  <CardContent className="p-0">
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setSelectedApplication(selectedApplication === app.id ? null : app.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{app.jobTitle}</h3>
                            <Badge variant="outline" className="text-red-500 border-red-500">
                              {app.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="mr-1 h-4 w-4" />
                              {app.company}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {app.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-4 w-4" />
                              Applied on {app.applied}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Status:</strong> {app.nextStep}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <ChevronRight
                            className={`h-5 w-5 transition-transform ${selectedApplication === app.id ? "transform rotate-90" : ""}`}
                          />
                        </div>
                      </div>

                      {selectedApplication === app.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Job Description</h4>
                              <p className="text-sm text-muted-foreground">{app.description}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Your Notes</h4>
                              <p className="text-sm text-muted-foreground">{app.notes}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Application Timeline</h4>
                              <div className="relative">
                                {app.timeline.map((event, index) => (
                                  <div key={index} className="flex gap-4 mb-4">
                                    <div className="relative">
                                      <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
                                      {index < app.timeline.length - 1 && (
                                        <div
                                          className={`absolute top-3 left-1.5 w-0 h-full -ml-px border-l-2 ${getTimelineConnectorColor(event.status)}`}
                                        ></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{event.event}</p>
                                      <p className="text-xs text-muted-foreground">{event.date}</p>
                                    </div>
                                    <div className="text-xs">
                                      {event.status === "complete" && (
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline">View Similar Jobs</Button>
                              <Button variant="outline">Delete</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No Archived Applications</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    You don't have any archived job applications. Applications that are rejected, withdrawn, or declined
                    will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
