"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Share2,
  Users,
  Briefcase,
  FileText,
} from "lucide-react"
import Image from "next/image"

// This would typically come from an API call
const businessProfileData = {
  id: "685a1c65-7571-4d73-be29-247e84e5d93a",
  email: "test@gmail.com",
  password: "$2b$10$D/dhUOmp3NF3XbBVTbLqm.K2EBQYJ.YNy.WyS6SFtIHzAF37Ol2Ci",
  firstName: "Naveed",
  lastName: "Ali",
  createdAt: "2025-05-19T10:02:43.046Z",
  updatedAt: "2025-05-19T10:02:43.046Z",
  isVerified: false,
  isDeleted: false,
  isSuspended: false,
  role: "BUSINESS",
  provider: "EMAIL_PASSWORD",
  defaultProfile: "BUSINESS",
  firstTimeLogin: true,
  businessProfile: {
    id: "a0eab88a-127f-4abb-b363-a2ac98c960fb",
    userId: "685a1c65-7571-4d73-be29-247e84e5d93a",
    companyName: "kohminds",
    description:
      "Need reliable plumbing help? I'm a licensed plumber with over 5 years of experience handling everything from leak repairs and pipe installations to bathroom remodeling and emergency services. Whether it's a clogged drain or a full repiping job, I deliver fast, affordable, and high-quality work. Available for both residential and commercial projects. Satisfaction guaranteed.",
    industry: "technology",
    city: "Miami",
    state: "Florida",
    country: "United States",
    website: null,
    employeeCount: 10,
    yearFounded: 2025,
    totalSpent: 0,
    postedJobs: 6,
    onboardingStep: "COMPLETED",
  },
}

export default function BusinessProfilePage() {
  const { businessProfile, firstName, lastName, email, role, createdAt } = businessProfileData

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm md:h-32 md:w-32">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt={businessProfile.companyName}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-bold">{businessProfile.companyName}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {businessProfile.city}, {businessProfile.state}, {businessProfile.country}
                    </span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{businessProfile.industry}</span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Est. {businessProfile.yearFounded}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{businessProfile.description}</p>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Plumbing Installation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete installation services for residential and commercial properties, including pipes,
                      fixtures, and appliances.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Leak Repairs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fast and reliable leak detection and repair services to prevent water damage and conserve water.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Bathroom Remodeling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete bathroom renovation services, from fixture replacement to full remodels.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Emergency Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      24/7 emergency plumbing services for urgent issues like burst pipes and major leaks.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="projects" className="space-y-4 pt-4">
              <p className="text-muted-foreground">No projects to display at this time.</p>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4 pt-4">
              <p className="text-muted-foreground">No reviews to display at this time.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Company Size</p>
                    <p className="text-sm text-muted-foreground">{businessProfile.employeeCount} employees</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Year Founded</p>
                    <p className="text-sm text-muted-foreground">{businessProfile.yearFounded}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Jobs Posted</p>
                    <p className="text-sm text-muted-foreground">{businessProfile.postedJobs} jobs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{email}</span>
                  </div>
                  {businessProfile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={businessProfile.website} className="text-primary hover:underline">
                        {businessProfile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Contact for phone number</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Owner Card */}
          <Card>
            <CardHeader>
              <CardTitle>Business Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt={`${firstName} ${lastName}`} />
                  <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {firstName} {lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{role.charAt(0) + role.slice(1).toLowerCase()} Owner</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications Card */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Licensed Plumber</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Certified Contractor</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Insured Business</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Jobs Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Job Postings</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {businessProfile.postedJobs > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Experienced Electrician Needed</p>
                      <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Plumbing Assistant Required</p>
                      <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No job postings yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
