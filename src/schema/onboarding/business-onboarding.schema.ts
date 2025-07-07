import { z } from "zod";
import data from '@/data/onboarding/business.json';

const industryValues = data.industryOptions.map(option => option.value);

export const businessOnboardingSchema = z.object({
  // Company Info
  companyName: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  industry: z.enum(industryValues as [string, ...string[]], {
    required_error: "Please select an industry",
  }),
  
  // Business Details
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  website: z.string().optional().or(z.literal("")),
  employeeCount: z.enum(["1-5", "6-9", "10-20", "21-50", "51-100", "100+"], {
    required_error: "Please select employee count range",
  }),
  yearFounded: z.coerce.number().int().min(1800).max(new Date().getFullYear()),
});

export type BusinessOnboardingSchema = z.infer<typeof businessOnboardingSchema>; 