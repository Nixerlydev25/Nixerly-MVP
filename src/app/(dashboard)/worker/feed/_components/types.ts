export interface Job {
    id: string
    title: string
    description: string
    budget: number
    hourlyRateMin: number
    hourlyRateMax: number
    businessProfileId: string
    status: string
    createdAt: string
    updatedAt: string
    expiresAt: string | null
    employmentType: string
    jobType: string
    startDate: string
    numberOfWorkersRequired: number
    numberOfPositions: number
    requirements: string
    businessProfile: {
      id: string
      companyName: string
      description: string
      industry: string
      city: string
      state: string
      country: string
      website: string
      employeeCount: number
      yearFounded: number
    }
    skills: string[]
  }
  
  export interface JobsResponse {
    pagination: {
    totalCount: number
      totalPages: number
      currentPage: number
      hasMore: boolean
    }
    jobs: Job[]
    jobStatusCounts?: {
      open: number
      closed: number
    }
  }
  
  export const JobStatus = {
    OPEN: "Open",
    CLOSED: "Closed",
    FILLED: "Filled",
    EXPIRED: "Expired",
  }
  
  export const allSkills = [
    "QUALITY_CONTROL",
    "CODE_COMPLIANCE",
    "STRUCTURAL_ASSESSMENT",
    "INSTRUMENT_TECHNICIAN",
    "MAINTENANCE_TECHNICIAN",
    "ELECTRONICS_TECHNICIAN",
    "CALIBRATION_SPECIALIST",
    "ELECTRICAL_WIRING",
    "PLUMBING",
    "HVAC",
    "CARPENTRY",
    "WELDING",
    "MASONRY",
    "PAINTING",
    "ROOFING",
    "FLOORING",
    "DRYWALL",
    "LANDSCAPING",
    "CONCRETE_WORK",
    "EQUIPMENT_OPERATION",
  ]
  