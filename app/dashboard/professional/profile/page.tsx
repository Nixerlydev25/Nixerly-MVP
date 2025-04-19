"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Plus, Trash2, Upload, Save } from "lucide-react"

export default function ProfilePage() {
  const [skills, setSkills] = useState([
    "Project Management",
    "Site Supervision",
    "Building Regulations",
    "AutoCAD",
    "Health & Safety",
    "Team Leadership",
  ])
  const [newSkill, setNewSkill] = useState("")
  const [profileImage, setProfileImage] = useState("/mystical-forest-spirit.png")

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education & Certifications</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload a professional photo for your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                  <div className="relative h-24 w-24 rounded-full bg-gray-200 mb-4 sm:mb-0 overflow-hidden">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Photo
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
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <Input id="firstName" placeholder="John" defaultValue="John" />
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        defaultValue="john.doe@example.com"
                      />
                      <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Input id="phone" placeholder="+353 87 123 4567" defaultValue="+353 87 123 4567" />
                      <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <Input id="location" placeholder="Dublin, Ireland" defaultValue="Dublin, Ireland" />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <div className="relative">
                    <Input id="title" placeholder="Project Manager" defaultValue="Project Manager" />
                    <Briefcase className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself..."
                    defaultValue="Experienced Project Manager with over 10 years in the construction industry. Specialized in commercial building projects and team leadership."
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description of your professional background and expertise.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your professional skills and competencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                        aria-label={`Remove ${skill} skill`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Add a skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />
                  </div>
                  <Button onClick={addSkill} type="button">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add skills that are relevant to your profession. These will help employers find you.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Add your professional work history</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold">Senior Project Manager</h4>
                        <p className="text-sm text-muted-foreground">Dublin Construction Ltd</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>January 2020 - Present</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Dublin, Ireland</span>
                    </div>
                    <p className="text-sm">
                      Led a team of 15 professionals on commercial construction projects with budgets exceeding €5
                      million. Implemented new project management methodologies that reduced delivery time by 15%.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold">Project Manager</h4>
                        <p className="text-sm text-muted-foreground">Cork Builders Group</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>March 2015 - December 2019</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>Cork, Ireland</span>
                    </div>
                    <p className="text-sm">
                      Managed residential construction projects from planning to completion. Coordinated with
                      architects, engineers, and subcontractors to ensure quality and timely delivery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Add your educational background</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">BSc in Construction Management</h4>
                      <p className="text-sm text-muted-foreground">University College Dublin</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>2010 - 2014</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Add your professional certifications</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">Project Management Professional (PMP)</h4>
                      <p className="text-sm text-muted-foreground">Project Management Institute</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Issued: June 2016 • Expires: June 2025</span>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">NEBOSH Certificate in Construction Health and Safety</h4>
                      <p className="text-sm text-muted-foreground">
                        National Examination Board in Occupational Safety and Health
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Issued: March 2018</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>Showcase your work and projects</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src="/construction-skills-future.png"
                        alt="Office Building Project"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">Modern Office Building</h4>
                      <p className="text-sm text-muted-foreground">Dublin City Center, 2022</p>
                      <p className="text-sm mt-2">
                        10-story office building with sustainable design features. Led a team of 25 professionals.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src="/connected-construction-site.png"
                        alt="Residential Complex"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">Riverside Residential Complex</h4>
                      <p className="text-sm text-muted-foreground">Cork, 2019</p>
                      <p className="text-sm mt-2">
                        Luxury apartment complex with 120 units. Completed on time and under budget.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <h4 className="font-medium mb-1">Upload Project Images</h4>
                  <p className="text-sm text-muted-foreground mb-3">Drag and drop files or click to browse</p>
                  <Button variant="outline">Browse Files</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
