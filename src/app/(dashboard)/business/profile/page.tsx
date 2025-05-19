"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Calendar,
  Clock,
  Edit,
  FileText,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Users,
  Briefcase,
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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
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
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Licensed Plumber</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Certified Contractor</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Insured Business</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar */}
        <div className="space-y-6 md:order-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Business Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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

              <Separator className="my-4" />

              <div>
                <h3 className="mb-3 font-medium">Contact Information</h3>
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

              <Separator className="my-4" />

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Business Owner</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt={`${firstName} ${lastName}`} />
                    <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {firstName} {lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {role.charAt(0) + role.slice(1).toLowerCase()} Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 md:col-span-2 md:order-1">
          {/* About */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">About</h2>
              <Button variant="ghost" size="sm">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <p className="text-muted-foreground">{businessProfile.description}</p>
          </section>

          <Separator />

          {/* Tabs for different sections */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Services Offered</h3>
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Services
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Plumbing Installation</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete installation services for residential and commercial properties, including pipes, fixtures,
                    and appliances.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Leak Repairs</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast and reliable leak detection and repair services to prevent water damage and conserve water.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Bathroom Remodeling</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete bathroom renovation services, from fixture replacement to full remodels.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Emergency Services</h4>
                  <p className="text-sm text-muted-foreground">
                    24/7 emergency plumbing services for urgent issues like burst pipes and major leaks.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Recent Job Postings</h3>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </div>

              {businessProfile.postedJobs > 0 ? (
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Experienced Electrician Needed</h4>
                          <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">Full-time</Badge>
                            <Badge variant="outline">$25-40/hr</Badge>
                            <Badge variant="outline">Miami, FL</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Plumbing Assistant Required</h4>
                          <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">Part-time</Badge>
                            <Badge variant="outline">$18-22/hr</Badge>
                            <Badge variant="outline">Miami, FL</Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No job postings yet.</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <p className="text-muted-foreground">No reviews yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reviews from your customers will appear here once they're submitted.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
