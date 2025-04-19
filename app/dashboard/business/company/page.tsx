"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { Building, MapPin, Globe, Phone, Mail, Upload, Plus, Trash2, User, Save, Edit } from "lucide-react"

export default function CompanyProfilePage() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "CEO",
      email: "john@acmeconstruction.com",
      phone: "+353 87 123 4567",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "HR Manager",
      email: "sarah@acmeconstruction.com",
      phone: "+353 87 234 5678",
    },
  ])

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Dublin Office Tower",
      location: "Dublin City Center",
      year: "2023",
      description: "A 15-story office building with sustainable design features.",
      image: "/construction-skills-future.png",
    },
    {
      id: 2,
      name: "Riverside Apartments",
      location: "Cork",
      year: "2022",
      description: "Luxury residential complex with 120 units and riverside views.",
      image: "/connected-construction-site.png",
    },
  ])

  return (
    <DashboardLayout userType="business">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Company Profile</h2>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
            <TabsTrigger value="projects">Projects & Portfolio</TabsTrigger>
            <TabsTrigger value="social">Social & Links</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload your company logo to enhance your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                  <div className="relative h-32 w-32 rounded-md bg-gray-200 mb-4 sm:mb-0 overflow-hidden">
                    <img src="/abstract-geometric-logo.png" alt="Company Logo" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Logo
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square image, at least 400x400 pixels, less than 2MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        placeholder="Acme Construction Ltd"
                        defaultValue="Acme Construction Ltd"
                      />
                      <Building className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select defaultValue="construction">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="architecture">Architecture</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="real-estate">Real Estate Development</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="companySize">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">1-10 employees</SelectItem>
                        <SelectItem value="medium">11-50 employees</SelectItem>
                        <SelectItem value="large">51-200 employees</SelectItem>
                        <SelectItem value="enterprise">201+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearFounded">Year Founded</Label>
                    <Input id="yearFounded" placeholder="2010" defaultValue="2010" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      placeholder="123 Business Park, Dublin"
                      defaultValue="123 Business Park, Dublin"
                    />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Dublin" defaultValue="Dublin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input id="county" placeholder="Dublin" defaultValue="Dublin" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eircode">Eircode</Label>
                    <Input id="eircode" placeholder="D01 AB12" defaultValue="D01 AB12" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Input id="phone" placeholder="+353 1 234 5678" defaultValue="+353 1 234 5678" />
                      <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        placeholder="info@acmeconstruction.com"
                        defaultValue="info@acmeconstruction.com"
                      />
                      <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Input
                      id="website"
                      placeholder="https://www.acmeconstruction.com"
                      defaultValue="https://www.acmeconstruction.com"
                    />
                    <Globe className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Description</CardTitle>
                <CardDescription>Tell professionals about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    placeholder="Building Excellence Since 2010"
                    defaultValue="Building Excellence Since 2010"
                  />
                  <p className="text-xs text-muted-foreground">
                    A short phrase that captures your company's mission or values.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">About Your Company</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a description of your company..."
                    defaultValue="Acme Construction Ltd is a leading construction company based in Dublin, Ireland. With over a decade of experience in the industry, we specialize in commercial and residential construction projects. Our team of skilled professionals is committed to delivering high-quality work on time and within budget."
                    className="min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a comprehensive description of your company, including your history, specialties, and
                    values.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties</Label>
                  <Textarea
                    id="specialties"
                    placeholder="List your company's specialties..."
                    defaultValue="Commercial Construction, Residential Development, Sustainable Building, Project Management, Renovation, Interior Fit-outs"
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    List the areas your company specializes in, separated by commas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Add key team members to your company profile</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-2 h-4 w-4" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-md border border-dashed p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Plus className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Add Team Member</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add key team members to showcase your company's expertise and leadership.
                  </p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Projects & Portfolio</CardTitle>
                  <CardDescription>Showcase your company's past and current projects</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="rounded-lg border overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold">{project.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{project.location}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{project.year}</span>
                        </div>
                        <p className="text-sm mt-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h4 className="font-medium mb-1">Add Project</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Showcase your company's work to attract professionals
                  </p>
                  <Button>Add Project</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Media & Links</CardTitle>
                <CardDescription>Connect your social media accounts and other online profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative">
                    <Input
                      id="linkedin"
                      placeholder="https://www.linkedin.com/company/acme-construction"
                      defaultValue="https://www.linkedin.com/company/acme-construction"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Input
                      id="facebook"
                      placeholder="https://www.facebook.com/acmeconstruction"
                      defaultValue="https://www.facebook.com/acmeconstruction"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/acmeconstruction"
                      defaultValue="https://twitter.com/acmeconstruction"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Input
                      id="instagram"
                      placeholder="https://www.instagram.com/acmeconstruction"
                      defaultValue="https://www.instagram.com/acmeconstruction"
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="houzz">Houzz</Label>
                  <Input id="houzz" placeholder="https://www.houzz.ie/pro/acmeconstruction" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pinterest">Pinterest</Label>
                  <Input id="pinterest" placeholder="https://www.pinterest.com/acmeconstruction" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input id="youtube" placeholder="https://www.youtube.com/c/acmeconstruction" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
