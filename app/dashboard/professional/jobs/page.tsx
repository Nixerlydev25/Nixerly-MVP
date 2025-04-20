"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6 bg-blue-50">
        {/* Jobs Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-15 mix-blend-overlay bg-pattern"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Find Your Next Opportunity</h2>
                <p className="mt-1 text-white">Discover jobs that match your skills and experience</p>
              </div>
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]" onClick={() => setFiltersVisible(!filtersVisible)}>
                <Filter className="mr-2 h-4 w-4" />
                {filtersVisible ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
          </div>
        </div>

        <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <CardContent className="pt-4 px-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-blue-600" />
              <Input
                placeholder="Search for jobs, companies, or keywords..."
                className="pl-10 border-blue-200 focus:border-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {filtersVisible && (
          <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-800">Filter Jobs</CardTitle>
              <CardDescription className="text-blue-700">Refine your search with specific criteria</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-blue-800">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type}`}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => toggleJobType(type)}
                          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label htmlFor={`job-type-${type}`} className="text-sm text-blue-800">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-blue-800">Location</h4>
                  <div className="space-y-2">
                    {["Dublin", "Cork", "Galway", "Limerick", "Waterford"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-${location}`}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => toggleLocation(location)}
                          className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <label htmlFor={`location-${location}`} className="text-sm text-blue-800">
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-blue-800">Experience Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-entry" className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <label htmlFor="exp-entry" className="text-sm text-blue-800">
                        Entry Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-mid" defaultChecked className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <label htmlFor="exp-mid" className="text-sm text-blue-800">
                        Mid Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-senior" className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <label htmlFor="exp-senior" className="text-sm text-blue-800">
                        Senior Level
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-manager" className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <label htmlFor="exp-manager" className="text-sm text-blue-800">
                        Manager
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-executive" className="border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
                      <label htmlFor="exp-executive" className="text-sm text-blue-800">
                        Executive
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-blue-800">Salary Range</h4>
                    <div className="space-y-2">
                      <Slider
                        defaultValue={[40000]}
                        max={150000}
                        step={5000}
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        className="[&>span]:bg-blue-600"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">€{salaryRange[0].toLocaleString()}</span>
                        <span className="text-sm text-blue-700">€150,000+</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-blue-800">Posted Within</h4>
                    <Select defaultValue="any">
                      <SelectTrigger className="border-blue-200 focus:border-blue-600">
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
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
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
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-blue-800">{job.title}</h3>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                          {job.matches}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <div className="flex items-center text-sm text-blue-700">
                          <Building className="mr-1 h-4 w-4 text-blue-600" />
                          {job.company}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <MapPin className="mr-1 h-4 w-4 text-blue-600" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <Briefcase className="mr-1 h-4 w-4 text-blue-600" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <Euro className="mr-1 h-4 w-4 text-blue-600" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-sm text-blue-700">
                          <Calendar className="mr-1 h-4 w-4 text-blue-600" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">Save</Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">Apply Now</Button>
                    </div>
                  </div>

                  <Separator className="my-4 bg-blue-100" />

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-blue-800">Job Description</h4>
                      <p className="text-sm text-blue-700">{job.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-blue-800">Requirements</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-blue-700">
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
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-blue-400 opacity-70 mb-4" />
                <h3 className="text-lg font-medium text-blue-800">No jobs found</h3>
                <p className="text-sm text-blue-700 mt-2 max-w-md">
                  We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
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
