import * as z from "zod";

export const businessOnboardingSchema = z.object({
  // Company Info
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industry: z.string().min(1, "Please select an industry"),
  
  // Business Details
  location: z.string().min(1, "Location is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  employeeCount: z.number().min(1, "Employee count must be at least 1"),
  yearFounded: z.number().min(1900, "Year must be after 1900").max(new Date().getFullYear(), "Year cannot be in the future"),
});

export type BusinessOnboardingSchema = z.infer<typeof businessOnboardingSchema>; 