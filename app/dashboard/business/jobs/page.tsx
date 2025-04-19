"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { Briefcase, MapPin, Calendar, Users, Plus, Search, Edit, Eye, Clock, CheckCircle, XCircle } from "lucide-react"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample job postings
  const jobPostings = [
    {
      id: 1,
      title: "Project Manager",
      location: "Dublin, Ireland",
      type: "Full-time",
      posted: "April 10, 2025",
      expires: "May 10, 2025",
      applicants: 12,
      status: "Active",
      description:
        "We are seeking an experienced Project Manager to oversee construction projects in the Dublin area. The ideal candidate will have 5+ years of experience in construction project management.",
      requirements: [
        "Bachelor's degree in Construction Management, Civil Engineering, or related field",
        "5+ years of experience in construction project management",
        "PMP certification preferred",
        "Strong leadership and communication skills",
        "Experience with project management software",
      ],
    },
    {
      id: 2,
      title: "Site Engineer",
      location: "Cork, Ireland",
      type: "Contract",
      posted: "April 5, 2025",
      expires: "May 5, 2025",
      applicants: 8,
      status: "Active",
      description:
        "We are looking for a Site Engineer to join our team for a 6-month contract in Cork. The successful candidate will be responsible for overseeing construction activities and ensuring compliance with design specifications.",
      requirements: [
        "Bachelor's degree in Civil Engineering or related field",
        "3+ years of experience as a Site Engineer",
        "Knowledge of construction methods and building codes",
        "Experience with AutoCAD and other design software",
        "Strong problem-solving abilities",
      ],
    },
    {
      id: 3,
      title: "Health & Safety Officer",
      location: "Galway, Ireland",
      type: "Full-time",
      posted: "March 28, 2025",
      expires: "April 28, 2025",
      applicants: 5,
      status: "Active",
      description:
        "We are seeking a Health & Safety Officer to ensure compliance with safety regulations across our construction sites in Galway. The ideal candidate will have experience in construction health and safety.",
      requirements: [
        "NEBOSH or equivalent qualification",
        "3+ years of experience in construction health and safety",
        "Knowledge of Irish health and safety legislation",
        "Experience conducting safety audits and risk assessments",
        "Strong communication and reporting skills",
      ],
    },
    {
      id: 4,
      title: "Quantity Surveyor",
      location: "Dublin, Ireland",
      type: "Full-time",
      posted: "March 20, 2025",
      expires: "April 20, 2025",
      applicants: 7,
      status: "Closed",
      description:
        "We are looking for a Quantity Surveyor to join our team in Dublin. The successful candidate will be responsible for cost estimation, procurement, and financial management of construction projects.",
      requirements: [
        "Degree in Quantity Surveying or related field",
        "Minimum 4 years of experience as a Quantity Surveyor",
        "Proficiency in cost estimation software",
        "Strong analytical and mathematical skills",
        "Excellent negotiation abilities",
      ],
    },
    {
      id: 5,
      title: "Construction Manager",
      location: "Limerick, Ireland",
      type: "Full-time",
      posted: "March 15, 2025",
      expires: "April 15, 2025",
      applicants: 10,
      status: "Closed",
      description:
        "We are seeking a Construction Manager to oversee multiple residential and commercial projects in Limerick. The ideal candidate will have experience in project planning, resource allocation, and team management.",
      requirements: [
        "Bachelor's degree in Construction Management or related field",
        "8+ years of experience in construction management",
        "Strong understanding of construction methodologies and techniques",
        "Excellent communication and leadership skills",
        "Experience with project management software",
      ],
    },
  ]

  const activeJobs = jobPostings.filter((job) => job.status === "Active")
  const closedJobs = jobPostings.filter((job) => job.status === "Closed")

  const filteredActiveJobs = activeJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredClosedJobs = closedJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userType="business">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Job Postings</h2>
          <Button asChild>
            <Link href="/dashboard/business/post-job">
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job postings..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="dublin">Dublin</SelectItem>
              <SelectItem value="cork">Cork</SelectItem>
              <SelectItem value="galway">Galway</SelectItem>
              <SelectItem value="limerick">Limerick</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed Jobs ({closedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {filteredActiveJobs.length > 0 ? (
              filteredActiveJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            Posted: {job.posted}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            Expires: {job.expires}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/business/jobs/${job.id}/applicants`}>
                            <Users className="mr-2 h-4 w-4" />
                            View Applicants
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/business/jobs/${job.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Close
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Requirements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No Active Job Postings</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    You don't have any active job postings at the moment. Create a new job posting to start finding
                    professionals.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/business/post-job">
                      <Plus className="mr-2 h-4 w-4" />
                      Post a Job
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {filteredClosedJobs.length > 0 ? (
              filteredClosedJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="outline" className="text-gray-500 border-gray-300">
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            Posted: {job.posted}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {job.applicants} applicants
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/business/jobs/${job.id}/applicants`}>
                            <Users className="mr-2 h-4 w-4" />
                            View Applicants
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-500 hover:text-green-600">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Reopen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                  <h3 className="text-lg font-medium">No Closed Job Postings</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    You don't have any closed job postings at the moment. Job postings that are closed or expired will
                    appear here.
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
