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
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-blue-50">
        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-15 mix-blend-overlay bg-pattern"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Your Professional Profile</h2>
                <p className="mt-1 text-white">Complete your profile to maximize your opportunities</p>
              </div>
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="bg-white p-1 shadow-md border border-blue-200 rounded-xl">
            <TabsTrigger value="personal" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">Personal Info</TabsTrigger>
            <TabsTrigger value="experience" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">Experience</TabsTrigger>
            <TabsTrigger value="education" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">Education & Certifications</TabsTrigger>
            <TabsTrigger value="portfolio" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Profile Picture</CardTitle>
                <CardDescription className="text-blue-700">Upload a professional photo for your profile</CardDescription>
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
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Photo
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-blue-700">
                      Recommended: Square image, at least 400x400 pixels, less than 2MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Personal Information</CardTitle>
                <CardDescription className="text-blue-700">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-blue-800">First Name</Label>
                    <div className="relative">
                      <Input id="firstName" placeholder="John" defaultValue="John" className="border-blue-200 focus:border-blue-600" />
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-blue-800">Last Name</Label>
                    <div className="relative">
                      <Input id="lastName" placeholder="Doe" defaultValue="Doe" className="border-blue-200 focus:border-blue-600" />
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-800">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        defaultValue="john.doe@example.com"
                        className="border-blue-200 focus:border-blue-600"
                      />
                      <Mail className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-800">Phone</Label>
                    <div className="relative">
                      <Input id="phone" placeholder="+353 87 123 4567" defaultValue="+353 87 123 4567" className="border-blue-200 focus:border-blue-600" />
                      <Phone className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-blue-800">Location</Label>
                  <div className="relative">
                    <Input id="location" placeholder="Dublin, Ireland" defaultValue="Dublin, Ireland" className="border-blue-200 focus:border-blue-600" />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-blue-800">Professional Title</Label>
                  <div className="relative">
                    <Input id="title" placeholder="Project Manager" defaultValue="Project Manager" className="border-blue-200 focus:border-blue-600" />
                    <Briefcase className="absolute right-3 top-2.5 h-4 w-4 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-blue-800">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio about yourself..."
                    defaultValue="Experienced Project Manager with over 10 years in the construction industry. Specialized in commercial building projects and team leadership."
                    className="min-h-[120px] border-blue-200 focus:border-blue-600"
                  />
                  <p className="text-xs text-blue-700">
                    Brief description of your professional background and expertise.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Skills</CardTitle>
                <CardDescription className="text-blue-700">Add your professional skills and competencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full hover:bg-blue-200 p-0.5"
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
                      className="border-blue-200 focus:border-blue-600"
                    />
                  </div>
                  <Button onClick={addSkill} type="button" className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-blue-700">
                  Add skills that are relevant to your profession. These will help employers find you.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold text-blue-800">Work Experience</CardTitle>
                  <CardDescription className="text-blue-700">Add your professional work history</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-blue-800">Senior Project Manager</h4>
                        <p className="text-sm text-blue-700">Dublin Construction Ltd</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-blue-700 mb-2">
                      <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                      <span>January 2020 - Present</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-700 mb-3">
                      <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Dublin, Ireland</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Led a team of 15 professionals on commercial construction projects with budgets exceeding €5
                      million. Implemented new project management methodologies that reduced delivery time by 15%.
                    </p>
                  </div>

                  <div className="rounded-lg border border-blue-200 p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-blue-800">Project Manager</h4>
                        <p className="text-sm text-blue-700">Cork Builders Group</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-blue-700 mb-2">
                      <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                      <span>March 2015 - December 2019</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-700 mb-3">
                      <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                      <span>Cork, Ireland</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Managed residential construction projects from planning to completion. Coordinated with
                      architects, engineers, and subcontractors to ensure quality and timely delivery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold text-blue-800">Education</CardTitle>
                  <CardDescription className="text-blue-700">Add your educational background</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-blue-200 p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-blue-800">BSc in Construction Management</h4>
                      <p className="text-sm text-blue-700">University College Dublin</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    <span>2010 - 2014</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold text-blue-800">Certifications</CardTitle>
                  <CardDescription className="text-blue-700">Add your professional certifications</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-blue-200 p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-blue-800">Project Management Professional (PMP)</h4>
                      <p className="text-sm text-blue-700">Project Management Institute</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Issued: June 2016 • Expires: June 2025</span>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-200 p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-blue-800">NEBOSH Certificate in Construction Health and Safety</h4>
                      <p className="text-sm text-blue-700">
                        National Examination Board in Occupational Safety and Health
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-blue-700 mb-2">
                    <Calendar className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Issued: March 2018</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4 mt-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-bold text-blue-800">Portfolio</CardTitle>
                  <CardDescription className="text-blue-700">Showcase your work and projects</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-blue-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src="/construction-skills-future.png"
                        alt="Office Building Project"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-blue-800">Modern Office Building</h4>
                      <p className="text-sm text-blue-700">Dublin City Center, 2022</p>
                      <p className="text-sm mt-2 text-blue-800">
                        10-story office building with sustainable design features. Led a team of 25 professionals.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src="/connected-construction-site.png"
                        alt="Residential Complex"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-blue-800">Riverside Residential Complex</h4>
                      <p className="text-sm text-blue-700">Cork, 2019</p>
                      <p className="text-sm mt-2 text-blue-800">
                        Luxury apartment complex with 120 units. Completed on time and under budget.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border border-dashed border-blue-200 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                  <Upload className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-800 mb-1">Upload Project Images</h4>
                  <p className="text-sm text-blue-700 mb-3">Drag and drop files or click to browse</p>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">Browse Files</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
