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
import { Search, MapPin, Briefcase, Calendar, Building, Euro, Filter, X, ChevronDown } from "lucide-react"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [salaryRange, setSalaryRange] = useState([40000])
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["Full-time"])
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Dublin"])

  // Sample job listings
  const jobListings = [
    {
      id: 1,
      title: "Senior Project Manager",
      company: "Dublin Construction Ltd",
      location: "Dublin, Ireland",
      type: "Full-time",
      salary: "€70,000 - €85,000",
      posted: "2 days ago",
      description:
        "Leading construction firm seeks experienced Project Manager to oversee large-scale commercial projects in Dublin city center. The ideal candidate will have 7+ years of experience managing commercial construction projects.",
      requirements: [
        "7+ years of experience in construction project management",
        "Degree in Construction Management, Civil Engineering, or related field",
        "PMP certification preferred",
        "Experience with BIM software",
        "Strong leadership and communication skills",
      ],
      matches: "95% match",
    },
    {
      id: 2,
      title: "Site Supervisor",
      company: "Cork Builders Group",
      location: "Cork, Ireland",
      type: "Contract",
      salary: "€50,000 - €60,000",
      posted: "3 days ago",
      description:
        "Seeking an experienced Site Supervisor to oversee residential construction projects in Cork. You will be responsible for day-to-day site operations, quality control, and safety compliance.",
      requirements: [
        "5+ years of experience in site supervision",
        "Strong knowledge of building regulations and safety standards",
        "Experience managing subcontractors",
        "Excellent problem-solving abilities",
        "Valid Safe Pass and Manual Handling certificates",
      ],
      matches: "87% match",
    },
    {
      id: 3,
      title: "Construction Manager",
      company: "Galway Development",
      location: "Galway, Ireland",
      type: "Full-time",
      salary: "€65,000 - €75,000",
      posted: "1 week ago",
      description:
        "Galway Development is looking for a Construction Manager to oversee multiple residential and commercial projects. You will be responsible for project planning, resource allocation, and ensuring projects are completed on time and within budget.",
      requirements: [
        "Bachelor's degree in Construction Management or related field",
        "8+ years of experience in construction management",
        "Strong understanding of construction methodologies and techniques",
        "Excellent communication and leadership skills",
        "Experience with project management software",
      ],
      matches: "82% match",
    },
    {
      id: 4,
      title: "Health & Safety Officer",
      company: "Safety First Construction",
      location: "Dublin, Ireland",
      type: "Full-time",
      salary: "€45,000 - €55,000",
      posted: "5 days ago",
      description:
        "Safety First Construction is seeking a dedicated Health & Safety Officer to ensure compliance with safety regulations across multiple construction sites in Dublin.",
      requirements: [
        "NEBOSH or equivalent qualification",
        "3+ years of experience in construction health and safety",
        "Knowledge of Irish health and safety legislation",
        "Experience conducting safety audits and risk assessments",
        "Strong communication and reporting skills",
      ],
      matches: "79% match",
    },
    {
      id: 5,
      title: "Quantity Surveyor",
      company: "Limerick Builders",
      location: "Limerick, Ireland",
      type: "Full-time",
      salary: "€55,000 - €65,000",
      posted: "1 week ago",
      description:
        "Limerick Builders requires a Quantity Surveyor to join our growing team. You will be responsible for cost estimation, procurement, and financial management of construction projects.",
      requirements: [
        "Degree in Quantity Surveying or related field",
        "Minimum 4 years of experience as a Quantity Surveyor",
        "Proficiency in cost estimation software",
        "Strong analytical and mathematical skills",
        "Excellent negotiation abilities",
      ],
      matches: "76% match",
    },
  ]

  const toggleJobType = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter((t) => t !== type))
    } else {
      setSelectedJobTypes([...selectedJobTypes, type])
    }
  }

  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    } else {
      setSelectedLocations([...selectedLocations, location])
    }
  }

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type)

    const matchesLocation =
      selectedLocations.length === 0 || selectedLocations.includes(job.location.split(",")[0].trim())

    return matchesSearch && matchesJobType && matchesLocation
  })

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Find Jobs</h2>
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
            placeholder="Search for jobs, companies, or keywords..."
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
                  <h4 className="font-medium text-sm">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type}`}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                        />
                        <label htmlFor={`job-type-${type}`} className="text-sm">
                          {type}
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
                  <h4 className="font-medium text-sm">Experience Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-entry" />
                      <label htmlFor="exp-entry" className="text-sm">
                        Entry Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-mid" defaultChecked />
                      <label htmlFor="exp-mid" className="text-sm">
                        Mid Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-senior" />
                      <label htmlFor="exp-senior" className="text-sm">
                        Senior Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-manager" />
                      <label htmlFor="exp-manager" className="text-sm">
                        Manager
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-executive" />
                      <label htmlFor="exp-executive" className="text-sm">
                        Executive
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Salary Range</h4>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[40000]}
                        max={150000}
                        step={5000}
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">€{salaryRange[0].toLocaleString()}</span>
                        <span className="text-sm">€150,000+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Posted Within</h4>
                    <Select defaultValue="any">
                      <SelectTrigger>
                        <SelectValue placeholder="Any time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any time</SelectItem>
                        <SelectItem value="day">Past 24 hours</SelectItem>
                        <SelectItem value="week">Past week</SelectItem>
                        <SelectItem value="month">Past month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedJobTypes([])
                    setSelectedLocations([])
                    setSalaryRange([40000])
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
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary" className="text-green-600 bg-green-100">
                            {job.matches}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="mr-1 h-4 w-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Briefcase className="mr-1 h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Euro className="mr-1 h-4 w-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            Posted {job.posted}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Save</Button>
                        <Button>Apply Now</Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Job Description</h4>
                        <p className="text-sm text-muted-foreground">{job.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Requirements</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedJobTypes([])
                    setSelectedLocations([])
                    setSalaryRange([40000])
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
