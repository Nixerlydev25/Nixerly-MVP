"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { Search, MapPin, Briefcase, User, Filter, X, ChevronDown, Star, MessageSquare } from "lucide-react"

export default function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [experienceRange, setExperienceRange] = useState([5])
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Project Manager"])
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Dublin"])

  // Sample professionals
  const professionals = [
    {
      id: 1,
      name: "Michael O'Connor",
      title: "Senior Project Manager",
      location: "Dublin, Ireland",
      experience: "10+ years",
      skills: ["Project Management", "Team Leadership", "Budgeting"],
      match: "95% match",
      availability: "Available from June 1",
      about:
        "Experienced Project Manager with a proven track record in commercial construction projects. Specialized in managing large-scale developments with budgets exceeding €5 million.",
    },
    {
      id: 2,
      name: "Sarah Murphy",
      title: "Civil Engineer",
      location: "Cork, Ireland",
      experience: "8 years",
      skills: ["Structural Design", "Site Inspection", "AutoCAD"],
      match: "87% match",
      availability: "Available now",
      about:
        "Civil Engineer with expertise in structural design and site inspection. Proficient in AutoCAD and other design software. Experience in both residential and commercial projects.",
    },
    {
      id: 3,
      name: "David Kelly",
      title: "Construction Supervisor",
      location: "Galway, Ireland",
      experience: "12 years",
      skills: ["Site Management", "Health & Safety", "Quality Control"],
      match: "82% match",
      availability: "Available from May 15",
      about:
        "Construction Supervisor specializing in site management and health & safety compliance. Strong background in quality control and team leadership on residential construction sites.",
    },
    {
      id: 4,
      name: "Emma Walsh",
      title: "Quantity Surveyor",
      location: "Dublin, Ireland",
      experience: "6 years",
      skills: ["Cost Estimation", "Procurement", "Contract Management"],
      match: "79% match",
      availability: "Available now",
      about:
        "Quantity Surveyor with experience in cost estimation, procurement, and contract management. Skilled in managing project budgets and negotiating with suppliers and contractors.",
    },
    {
      id: 5,
      name: "John Byrne",
      title: "Architectural Technician",
      location: "Limerick, Ireland",
      experience: "5 years",
      skills: ["Technical Drawing", "BIM", "3D Modeling"],
      match: "76% match",
      availability: "Available from June 15",
      about:
        "Architectural Technician proficient in technical drawing, BIM, and 3D modeling. Experience in creating detailed construction drawings and collaborating with architects and engineers.",
    },
  ]

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    } else {
      setSelectedLocations([...selectedLocations, location])
    }
  }

  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(professional.title.split(" ").pop() || "")

    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(professional.location.split(",")[0].trim())

    return matchesSearch && matchesRole && matchesLocation
  })

  return (
    <DashboardLayout userType="business">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Find Professionals</h2>
          <Button variant="outline" onClick={() => setFiltersVisible(!filtersVisible)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {filtersVisible ? (
              <ChevronDown className="ml-2 h-4 w-4 transform rotate-180" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for professionals by name, skills, or role..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filtersVisible && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Role</h4>
                  <div className="space-y-2">
                    {["Project Manager", "Engineer", "Supervisor", "Surveyor", "Technician"].map((role) => (
                      <div key={role} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role}`}
                          checked={selectedRoles.includes(role)}
                          onCheckedChange={() => toggleRole(role)}
                        />
                        <label htmlFor={`role-${role}`} className="text-sm">
                          {role}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Location</h4>
                  <div className="space-y-2">
                    {["Dublin", "Cork", "Galway", "Limerick", "Waterford"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                        />
                        <label htmlFor={`location-${location}`} className="text-sm">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="avail-now" defaultChecked />
                      <label htmlFor="avail-now" className="text-sm">
                        Available Now
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="avail-soon" defaultChecked />
                      <label htmlFor="avail-soon" className="text-sm">
                        Available Within 30 Days
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="avail-later" />
                      <label htmlFor="avail-later" className="text-sm">
                        Available Later
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Years of Experience</h4>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[5]}
                        max={20}
                        step={1}
                        value={experienceRange}
                        onValueChange={setExperienceRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{experienceRange[0]}+ years</span>
                        <span className="text-sm">20+ years</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Sort By</h4>
                    <Select defaultValue="match">
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">Best Match</SelectItem>
                        <SelectItem value="experience-high">Experience (High to Low)</SelectItem>
                        <SelectItem value="experience-low">Experience (Low to High)</SelectItem>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRoles([])
                    setSelectedLocations([])
                    setExperienceRange([5])
                    setSearchTerm("")
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <User className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold">{professional.name}</h3>
                            <Badge variant="secondary" className="text-green-600 bg-green-100">
                              {professional.match}
                            </Badge>
                          </div>
                          <p className="text-lg text-nixerly-blue">{professional.title}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-4 w-4" />
                              {professional.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Briefcase className="mr-1 h-4 w-4" />
                              {professional.experience}
                            </div>
                            <div className="flex items-center text-sm text-green-600">
                              <User className="mr-1 h-4 w-4" />
                              {professional.availability}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Star className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                        <Button>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">About</h4>
                        <p className="text-sm text-muted-foreground">{professional.about}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {professional.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" className="mr-2">
                        View Full Profile
                      </Button>
                      <Button>Invite to Apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium">No professionals found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  We couldn't find any professionals matching your search criteria. Try adjusting your filters or search
                  terms.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedRoles([])
                    setSelectedLocations([])
                    setExperienceRange([5])
                    setSearchTerm("")
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
