import { useState, useEffect } from "react"
import { useMutation, useQuery } from '@tanstack/react-query';
import JobsService from '@/services/jobs/jobs.service';
import { toast } from 'sonner';
import { QueryKeys } from '@/querykey';
import {
  Job,
  JobsResponse,
} from '@/app/(dashboard)/worker/feed/_components/types';
import { useSearchParams } from 'next/navigation';
import { JobApplicationSubmitData } from '@/app/(dashboard)/worker/job/[id]/apply/_component/types';

export const useCreateJob = () => {
  return useMutation({
    mutationKey: [QueryKeys.JOB_CREATE],
    mutationFn: JobsService.createJob,
    onSuccess: () => {
      toast.success('Job created successfully');
    },
    onError: () => {
      toast.error('Failed to create job');
    },
  });
};

export const useGetAllJobs = () => {
  const searchParams = useSearchParams();
  const params = {
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    search: searchParams.get('search') || '',
    minHourlyRate: Number(searchParams.get('minHourlyRate')) || 0,
    maxHourlyRate: Number(searchParams.get('maxHourlyRate')) || 100,
    status: searchParams.get('status') || undefined,
  };
  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_GET_ALL, params],
    queryFn: () => JobsService.getAlljobs(params),
  });
};

export const useGetSingleJob = (param?: string) => {
  return useQuery<Job>({
    queryKey: [QueryKeys.JOB_DETAILS, param],
    queryFn: () => JobsService.getJobDetails(param),
  });
};

export const useApplyJobs = () => {
  return useMutation({
    mutationKey: [QueryKeys.JOB_DETAILS],
    mutationFn: ({ id, data }: { id: string; data: JobApplicationSubmitData }) =>
      JobsService.applyForJob(id, data),
  });
};

export const useListMyJobs = (params?: string) => {
  return useQuery<JobsResponse>({
    queryKey: [QueryKeys.JOB_GET_ALL, params],
    // queryFn: () => JobsService.getAlljobs(params),
  });
};

// Applicant type with full details
export interface JobApplicant {
  id: string
  fullName: string
  email: string
  phone: string
  avatar?: string
  appliedAt: string
  status: "new" | "shortlisted" | "interviewed" | "rejected" | "hired"
  paymentType: "hourly" | "fixed"
  hourlyRate?: string
  fixedBudget?: string
  estimatedDuration: string
  relevantExperience: string
  coverLetter: string
  certifications?: string
  resumeUrl?: string
}

interface JobDetails {
  id: string
  title: string
  description: string
  requirements: string
  employmentType: string
  jobType: string
  hourlyRateMin: number
  hourlyRateMax: number
  startDate: string
  createdAt: string
  status: string
  numberOfPositions: number
  skills: string[]
  businessProfile: {
    id: string
    companyName: string
    description: string
    city: string
    state: string
    country: string
    industry: string
    employeeCount: string
    yearFounded: string
    website: string
  }
}

// Mock implementation of useJobApplicants hook
export function useJobApplicants(jobId: string) {
  const [job, setJob] = useState<JobDetails | null>(null)
  const [applicants, setApplicants] = useState<JobApplicant[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call
        // For now, we'll just return mock data after a delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock job data
        const mockJob: JobDetails = {
          id: jobId,
          title: "Experienced Plumber Needed for Residential Projects",
          description:
            "We're looking for an experienced plumber to join our team for various residential projects. The ideal candidate will have experience with installations, repairs, and maintenance of plumbing systems in homes.",
          requirements:
            "- 3+ years of experience in residential plumbing\n- Knowledge of local building codes\n- Valid driver's license\n- Own basic tools\n- Ability to work independently and as part of a team",
          employmentType: "Full-time",
          jobType: "On-site",
          hourlyRateMin: 25,
          hourlyRateMax: 35,
          startDate: new Date().toISOString(),
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
          status: "active",
          numberOfPositions: 2,
          skills: ["plumbing", "pipe_fitting", "troubleshooting", "maintenance", "residential"],
          businessProfile: {
            id: "123",
            companyName: "Reliable Plumbing Co.",
            description:
              "Reliable Plumbing Co. has been serving the local community for over 15 years. We specialize in residential and commercial plumbing services, from repairs and maintenance to new installations.",
            city: "San Diego",
            state: "CA",
            country: "USA",
            industry: "Construction & Maintenance",
            employeeCount: "10-50",
            yearFounded: "2008",
            website: "https://reliableplumbing.example.com",
          },
        }

        // Mock applicants data
        const mockApplicants: JobApplicant[] = [
          {
            id: "a1",
            fullName: "John Smith",
            email: "john.smith@example.com",
            phone: "(555) 123-4567",
            appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "shortlisted",
            paymentType: "hourly",
            hourlyRate: "30",
            estimatedDuration: "one_to_two_weeks",
            relevantExperience: "5_to_10",
            coverLetter:
              "I have been working as a plumber for over 8 years, specializing in residential plumbing systems. I have extensive experience with installations, repairs, and maintenance of various plumbing fixtures and systems.\n\nIn my previous role at City Plumbing Services, I handled numerous residential projects, including complete bathroom and kitchen renovations, pipe replacements, and emergency repairs. I am familiar with local building codes and always ensure my work meets or exceeds industry standards.\n\nI have my own tools and a reliable vehicle, and I'm available to start immediately. I'm comfortable working independently but also enjoy being part of a team. I believe my skills and experience make me a great fit for this position, and I'm excited about the opportunity to join your team.",
            certifications:
              "- Licensed Journeyman Plumber (License #PL12345)\n- Certified in Backflow Prevention\n- OSHA 10-Hour Safety Certification\n- Certified in Green Plumbing Practices",
            resumeUrl: "/resumes/john-smith-resume.pdf",
          },
          {
            id: "a2",
            fullName: "Michael Johnson",
            email: "michael.johnson@example.com",
            phone: "(555) 234-5678",
            appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: "new",
            paymentType: "hourly",
            hourlyRate: "28",
            estimatedDuration: "two_to_four_weeks",
            relevantExperience: "3_to_5",
            coverLetter:
              "I am writing to express my interest in the plumber position at your company. With 4 years of experience in residential plumbing, I have developed strong skills in installation, repair, and maintenance of various plumbing systems.\n\nI have worked on numerous residential projects, including new construction and renovations. I am knowledgeable about local building codes and take pride in delivering high-quality work that meets all regulations.\n\nI have my own tools and transportation, and I am available to start immediately. I am a reliable and hardworking individual who can work independently or as part of a team. I am confident that my skills and experience make me a strong candidate for this position.",
            certifications:
              "- Journeyman Plumber License (#JP7890)\n- Certified in Water Heater Installation\n- First Aid and CPR Certified",
          },
          {
            id: "a3",
            fullName: "Robert Davis",
            email: "robert.davis@example.com",
            phone: "(555) 345-6789",
            avatar: "/placeholder.svg?height=40&width=40",
            appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "new",
            paymentType: "hourly",
            hourlyRate: "32",
            estimatedDuration: "less_than_week",
            relevantExperience: "more_than_10",
            coverLetter:
              "I am an experienced plumber with over 12 years in the field, specializing in residential and light commercial plumbing. Throughout my career, I have handled everything from routine maintenance to complex installations and emergency repairs.\n\nI currently work as a lead plumber for a local company but am looking for new opportunities where I can utilize my extensive experience. I am particularly skilled at troubleshooting difficult problems and finding efficient solutions.\n\nI have all my own tools, a reliable vehicle, and am available to start with minimal notice. I am familiar with all local building codes and always ensure my work is up to code and of the highest quality. I believe my experience and skills would make me a valuable addition to your team.",
            certifications:
              "- Master Plumber License (#MP4567)\n- Gas Fitting Certification\n- Backflow Prevention Certification\n- Commercial Plumbing Inspector Certification",
            resumeUrl: "/resumes/robert-davis-resume.pdf",
          },
          {
            id: "a4",
            fullName: "William Taylor",
            email: "william.taylor@example.com",
            phone: "(555) 456-7890",
            appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "new",
            paymentType: "fixed",
            fixedBudget: "5000",
            estimatedDuration: "one_to_three_months",
            relevantExperience: "1_to_3",
            coverLetter:
              "I am a recently licensed plumber with 2 years of hands-on experience in residential plumbing. I completed my apprenticeship under a master plumber where I gained valuable skills in installation, repair, and maintenance of various plumbing systems.\n\nAlthough I am relatively new to the field, I am a quick learner and have already handled a variety of projects independently. I am familiar with local building codes and always ensure my work meets all requirements.\n\nI have my own basic tools and reliable transportation. I am available to start immediately and am willing to work flexible hours, including weekends and emergencies when needed. I am looking for an opportunity to further develop my skills and grow as a professional plumber.",
            certifications:
              "- Apprentice Plumber License (#AP1234)\n- Basic Plumbing Certification\n- OSHA Safety Training",
          },
          {
            id: "a5",
            fullName: "James Wilson",
            email: "james.wilson@example.com",
            phone: "(555) 567-8901",
            appliedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            status: "interviewed",
            paymentType: "hourly",
            hourlyRate: "35",
            estimatedDuration: "two_to_four_weeks",
            relevantExperience: "5_to_10",
            coverLetter:
              "I am an experienced plumber with 7 years of specialized experience in residential plumbing systems. I have worked extensively on new construction, renovations, and repairs across various types of residential properties.\n\nIn my current role at Premium Plumbing Services, I serve as a senior technician handling complex installations and training junior staff. I am well-versed in all aspects of residential plumbing, including fixture installation, pipe repair, water heater services, and sewer line maintenance.\n\nI hold all necessary licenses and certifications and am committed to staying updated with the latest industry standards and technologies. I have my own comprehensive set of tools and a reliable vehicle.\n\nI am interested in joining your team because of your company's excellent reputation in the community and focus on quality service. I believe my skills and experience would be a valuable addition to your team.",
            certifications:
              "- Master Plumber License (#MP7890)\n- Certified in Tankless Water Heater Installation\n- Certified in Trenchless Sewer Repair\n- Backflow Prevention Certification",
            resumeUrl: "/resumes/james-wilson-resume.pdf",
          },
        ]

        setJob(mockJob)
        setApplicants(mockApplicants)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [jobId])

  return { job, applicants, isLoading, error }
}
