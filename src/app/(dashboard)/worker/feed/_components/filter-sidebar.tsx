import { useState } from "react"
import { Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { JobStatus, allSkills } from "./types"
import { formatCurrency } from "./utils"
import { useRouter, useSearchParams } from "next/navigation"

export function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSkills, setFilteredSkills] = useState(allSkills)

  // Derive filters from URL
  const filters = {
    status: searchParams.getAll("status"),
    skills: searchParams.get("skills")?.split(",") ?? [],
    minBudget: Number(searchParams.get("minBudget")) || 0,
    maxBudget: Number(searchParams.get("maxBudget")) || 10000,
    minHourlyRate: Number(searchParams.get("minHourlyRate")) || 0,
    maxHourlyRate: Number(searchParams.get("maxHourlyRate")) || 100,
    location: searchParams.get("location") || "",
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 20,
    sortBy: (searchParams.get("sortBy") as "createdAt") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "desc") || "desc",
  };

  const updateFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.status.length > 0) newFilters.status.forEach(s => params.append("status", s));
    if (newFilters.skills.length > 0) params.set("skills", newFilters.skills.join(","));
    if (newFilters.minBudget > 0) params.set("minBudget", String(newFilters.minBudget));
    if (newFilters.maxBudget < 10000) params.set("maxBudget", String(newFilters.maxBudget));
    if (newFilters.minHourlyRate > 0) params.set("minHourlyRate", String(newFilters.minHourlyRate));
    if (newFilters.maxHourlyRate < 100) params.set("maxHourlyRate", String(newFilters.maxHourlyRate));
    if (newFilters.location) params.set("location", newFilters.location);
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.page !== 1) params.set("page", String(newFilters.page));
    if (newFilters.limit !== 20) params.set("limit", String(newFilters.limit));
    if (newFilters.sortBy !== "createdAt") params.set("sortBy", newFilters.sortBy);
    if (newFilters.sortOrder !== "desc") params.set("sortOrder", newFilters.sortOrder);
    router.push(`?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]
    updateFilters({ ...filters, status: newStatuses })
  }
  
  const handleSkillChange = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill]
    updateFilters({ ...filters, skills: newSkills })
  }
  
  const handleBudgetChange = (value: number[]) => {
    updateFilters({ ...filters, minBudget: value[0], maxBudget: value[1] })
  }
  
  const handleHourlyRateChange = (value: number[]) => {
    updateFilters({ ...filters, minHourlyRate: value[0], maxHourlyRate: value[1] })
  }
  
  const handleLocationChange = (value: string) => {
    updateFilters({ ...filters, location: value })
  }

  const handleSearchChange = (value: string) => {
    updateFilters({ ...filters, search: value })
  }
  
  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value) {
      const filtered = allSkills.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredSkills(filtered)
    } else {
      setFilteredSkills(allSkills)
    }
  }
  
  const removeSkill = (skill: string) => {
    updateFilters({ ...filters, skills: filters.skills.filter(s => s !== skill) })
  }
  
  const removeStatus = (status: string) => {
    updateFilters({ ...filters, status: filters.status.filter(s => s !== status) })
  }
  
  const clearFilters = () => {
    router.push("?");
  }
  
  const hasActiveFilters = 
    filters.status.length > 0 || 
    filters.skills.length > 0 || 
    filters.minBudget > 0 || 
    filters.maxBudget < 10000 || 
    filters.minHourlyRate > 0 || 
    filters.maxHourlyRate < 100 ||
    filters.location !== "" ||
    filters.search !== ""
  
  return (
    <Card className="sticky top-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
              Clear all
            </Button>
          )}
        </div>
        
        {/* Search */}
        <div className="mb-4">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search Jobs
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search jobs..."
              className="pl-8"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {filters.search && (
              <X
                className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => handleSearchChange("")}
              />
            )}
          </div>
        </div>
        
        {/* Active filters */}
        {hasActiveFilters && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 mb-2">
              {filters.status.map(status => (
                <Badge key={status} variant="secondary" className="flex items-center gap-1">
                  {status}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeStatus(status)}
                  />
                </Badge>
              ))}
              {filters.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill.replace(/_/g, " ")}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeSkill(skill)}
                  />
                </Badge>
              ))}
              {(filters.minBudget > 0 || filters.maxBudget < 10000) && (
                <Badge variant="secondary">
                  Budget: {formatCurrency(filters.minBudget)} - {formatCurrency(filters.maxBudget)}
                </Badge>
              )}
              {(filters.minHourlyRate > 0 || filters.maxHourlyRate < 100) && (
                <Badge variant="secondary">
                  Rate: {formatCurrency(filters.minHourlyRate)} - {formatCurrency(filters.maxHourlyRate)}/hr
                </Badge>
              )}
              {filters.location && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  {filters.location}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleLocationChange("")}
                  />
                </Badge>
              )}
              {filters.search && (
                <Badge 
                  variant="secondary" 
                  className="flex items-center gap-1"
                >
                  Search: {filters.search}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleSearchChange("")}
                  />
                </Badge>
              )}
            </div>
            <Separator className="my-4" />
          </div>
        )}
        
        {/* Location filter */}
        <div className="mb-4">
          <Label htmlFor="location" className="text-sm font-medium mb-2 block">
            Location
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, state, or country"
              className="pl-8"
              value={filters.location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
            {filters.location && (
              <X
                className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => handleLocationChange("")}
              />
            )}
          </div>
        </div>
        
        <Accordion type="multiple" defaultValue={["status", "budget", "hourlyRate", "skills"]} className="w-full">
          {/* Job Status filter */}
          <AccordionItem value="status">
            <AccordionTrigger className="text-sm font-medium py-2">Job Status</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {Object.entries(JobStatus).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${key}`}
                      checked={filters.status.includes(key)}
                      onCheckedChange={() => handleStatusChange(key)}
                    />
                    <Label htmlFor={`status-${key}`} className="text-sm font-normal cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Budget Range filter */}
          <AccordionItem value="budget">
            <AccordionTrigger className="text-sm font-medium py-2">Budget Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">{formatCurrency(filters.minBudget)}</span>
                  <span className="text-sm">{formatCurrency(filters.maxBudget)}</span>
                </div>
                <Slider
                  defaultValue={[filters.minBudget, filters.maxBudget]}
                  min={0}
                  max={10000}
                  step={100}
                  value={[filters.minBudget, filters.maxBudget]}
                  onValueChange={handleBudgetChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Hourly Rate filter */}
          <AccordionItem value="hourlyRate">
            <AccordionTrigger className="text-sm font-medium py-2">Hourly Rate</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">{formatCurrency(filters.minHourlyRate)}/hr</span>
                  <span className="text-sm">{formatCurrency(filters.maxHourlyRate)}/hr</span>
                </div>
                <Slider
                  defaultValue={[filters.minHourlyRate, filters.maxHourlyRate]}
                  min={0}
                  max={100}
                  step={5}
                  value={[filters.minHourlyRate, filters.maxHourlyRate]}
                  onValueChange={handleHourlyRateChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Skills filter */}
          <AccordionItem value="skills">
            <AccordionTrigger className="text-sm font-medium py-2">Skills</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSkillSearchChange}
                  />
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  <div className="flex flex-col space-y-2">
                    {filteredSkills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleSkillChange(skill)}
                        />
                        <Label htmlFor={`skill-${skill}`} className="text-sm font-normal cursor-pointer">
                          {skill.replace(/_/g, " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
