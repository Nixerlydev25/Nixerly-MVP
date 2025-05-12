import { z } from "zod";
import onboardingData from "@/data/onboarding/worker.json";
import { OnboardingStepWorkerProfileB } from "@/types/onboarding";

// Create enums from onboarding.json data
const skillValues = onboardingData.skills.map(s => s.value as string);
const languageValues = onboardingData.languages.map(l => l.value as string);
const proficiencyValues = onboardingData.proficiencyLevels.map(p => p.value as string);
const experienceLevelValues = onboardingData.experienceLevels.map(e => e.value as string);

// Create type for skills by category
export type CategorySkills = {
  category: string;
  skills: string[];
};

export const SkillEnum = z.enum(skillValues as [string, ...string[]]);
export const LanguageEnum = z.enum(languageValues as [string, ...string[]]);
export const ProficiencyEnum = z.enum(proficiencyValues as [string, ...string[]]);
export const ExperienceLevelEnum = z.enum(experienceLevelValues as [string, ...string[]]);
export const OnboardingStepEnum = z.nativeEnum(OnboardingStepWorkerProfileB);

export const workerOnboardingSchema = z.object({
  // Personal Info
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Professional Info
  title: z.string().min(2, "Title must be at least 2 characters"),
  hourlyRate: z.number().min(0, "Hourly rate must be positive"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  skills: z.array(SkillEnum).min(1, "At least one skill is required").max(8, "Maximum of 8 skills allowed"),
  experienceLevel: ExperienceLevelEnum,
  availability: z.boolean().default(true),
  location: z.string().min(1, "Location is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  languages: z.array(
    z.object({
      name: LanguageEnum,
      proficiency: ProficiencyEnum,
    })
  ).min(1, "Add at least one language"),

  // Experience
  experience: z.array(
    z.object({
      title: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company is required"),
      location: z.string().min(1, "Location is required"),
      startDate: z.date({ required_error: "Start date is required" }),
      endDate: z.date().optional(),
      description: z.string().min(1, "Description is required"),
      current: z.boolean().default(false),
    })
  ),

  // Education
  education: z.array(
    z.object({
      school: z.string().min(1, "School is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      startDate: z.date({ required_error: "Start date is required" }),
      endDate: z.date().optional(),
      description: z.string().optional(),
    })
  ),

  // Onboarding Progress
  onboardingStep: OnboardingStepEnum.default(OnboardingStepWorkerProfileB.PERSONAL_INFO),
});

export type WorkerOnboardingSchema = z.infer<typeof workerOnboardingSchema>;

export const onboardingOptions = {
  skills: onboardingData.skills,
  experienceLevels: onboardingData.experienceLevels,
  languages: onboardingData.languages,
  proficiencyLevels: onboardingData.proficiencyLevels,
};
