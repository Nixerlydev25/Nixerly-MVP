import { z } from "zod";
import onboardingData from "../../data/onboarding.json";

// Create enums from the data file
const professionEnum = z.enum(
  onboardingData.professions.map((p) => p.value) as [string, ...string[]]
);
const referralSourceEnum = z.enum(
  onboardingData.referralSources.map((r) => r.value) as [string, ...string[]]
);
const experienceLevelEnum = z.enum(
  onboardingData.experienceLevels.map((e) => e.value) as [string, ...string[]]
);
const languageEnum = z.enum(
  onboardingData.languages.map((l) => l.value) as [string, ...string[]]
);
const proficiencyEnum = z.enum(
  onboardingData.proficiencyLevels.map((p) => p.value) as [string, ...string[]]
);

// Helper function to get all skills from all categories
const getAllSkills = () => {
  const allSkills: string[] = [];
  Object.values(onboardingData.skills).forEach((skills) => {
    skills.forEach((skill) => {
      allSkills.push(skill.value);
    });
  });
  return allSkills as [string, ...string[]];
};

// Helper function to get all subcategories from all categories
const getAllSubCategories = () => {
  const allSubCategories: string[] = [];
  Object.values(onboardingData.subCategories).forEach((subCategories) => {
    subCategories.forEach((subCategory) => {
      allSubCategories.push(subCategory.value);
    });
  });
  return allSubCategories as [string, ...string[]];
};

// Create skill and subcategory enums
const skillEnum = z.enum(getAllSkills());
const subCategoryEnum = z.enum(getAllSubCategories());

// Export the enum types for use in components
export type Profession = z.infer<typeof professionEnum>;
export type ReferralSource = z.infer<typeof referralSourceEnum>;
export type ExperienceLevel = z.infer<typeof experienceLevelEnum>;
export type Language = z.infer<typeof languageEnum>;
export type Proficiency = z.infer<typeof proficiencyEnum>;
export type Skill = z.infer<typeof skillEnum>;
export type SubCategory = z.infer<typeof subCategoryEnum>;

// Define a type for language proficiency objects
const languageProficiencySchema = z.object({
  language: languageEnum,
  proficiency: proficiencyEnum,
});

export const onboardingSchema = z.object({
  // Personal Info
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  howDidYouHearAboutUs: referralSourceEnum
    .or(z.literal(""))
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please let us know how you found us",
        });
      }
    }),

  // Professional Info
  title: z.string().min(1, "Professional title is required"),
  hourlyRate: z.coerce
    .number()
    .min(5, "Hourly rate must be at least $5")
    .max(500, "Hourly rate cannot exceed $500"),
  categoryId: professionEnum.or(z.literal("")).superRefine((val, ctx) => {
    if (!val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Category is required",
      });
    }
  }),
  skills: z.array(skillEnum).min(1, "Please select at least one skill"),
  experienceLevel: experienceLevelEnum
    .or(z.literal(""))
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Experience level is required",
        });
      }
    }),
  description: z.string().min(50, "Description must be at least 50 characters"),

  // Educational Info
  educationLevel: z.string().min(1, "Education level is required"),
  languages: z
    .array(languageProficiencySchema)
    .min(1, "Please specify at least one language"),
  availability: z.boolean().default(true),
  
  // This field is optional and added so the subCategoryEnum is used in the schema
  // It will be removed from the generated type
  _subCategoryForValidation: z.array(subCategoryEnum).optional(),
});

// Create a type for our form, omitting the unused field and ensuring availability is required
export type OnboardingSchema = Omit<z.infer<typeof onboardingSchema>, '_subCategoryForValidation' | 'availability'> & {
  availability: boolean;
};

// Export the data for use in components
export const onboardingOptions = {
  professions: onboardingData.professions,
  referralSources: onboardingData.referralSources,
  experienceLevels: onboardingData.experienceLevels,
  languages: onboardingData.languages,
  proficiencyLevels: onboardingData.proficiencyLevels,
  skills: onboardingData.skills,
  subCategories: onboardingData.subCategories,
} as const;
