import { z } from 'zod';
import onboardingData from '@/data/onboarding/worker.json';
import { OnboardingStepWorkerProfileB } from '@/types/onboarding';

// Create enums from onboarding.json data
const skillValues = onboardingData.skills.map((s) => s.value as string);
const languageValues = onboardingData.languages.map((l) => l.value as string);
const proficiencyValues = onboardingData.proficiencyLevels.map(
  (p) => p.value as string
);
const experienceLevelValues = onboardingData.experienceLevels.map(
  (e) => e.value as string
);

// Create type for skills by category
export type CategorySkills = {
  category: string;
  skills: string[];
};

export const SkillEnum = z.enum(skillValues as [string, ...string[]]);
export const LanguageEnum = z.enum(languageValues as [string, ...string[]]);
export const ProficiencyEnum = z.enum(
  proficiencyValues as [string, ...string[]]
);
export const ExperienceLevelEnum = z.enum(
  experienceLevelValues as [string, ...string[]]
);
export const OnboardingStepEnum = z.nativeEnum(OnboardingStepWorkerProfileB);

export const LanguageSchema = z.object({
  name: LanguageEnum,
  proficiency: ProficiencyEnum,
});

export const workerOnboardingSchema = z.object({
  // Personal Info
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^\+[1-9]\d{7,14}$/, 'Invalid phone number format. Please enter a valid international phone number starting with +.'),
  employmentType: z.enum(['SELF_EMPLOYED', 'PAYEE'], {
    required_error: 'Please select your employment type',
  }),

  // Professional Info
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'Title must be at least 2 characters'),
  hourlyRate: z
    .number({ required_error: 'Hourly rate is required' })
    .min(14, 'Hourly rate must be at least €14'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(50, 'Description must be at least 50 characters'),
  skills: z
    .array(SkillEnum, { required_error: 'Select at least one skill' })
    .min(1, 'At least one skill is required')
    .max(8, 'Maximum of 8 skills allowed'),
  experienceLevel: ExperienceLevelEnum.or(
    z.string({ required_error: 'Experience level is required' })
  ),
  availability: z
    .boolean({ required_error: 'Availability status is required' })
    .default(true),
  location: z
    .string({ required_error: 'Location is required' })
    .min(1, 'Location is required'),
  city: z
    .string({ required_error: 'City is required' })
    .min(1, 'City is required'),
  state: z
    .string({ required_error: 'State is required' })
    .min(1, 'State is required'),
  country: z
    .string({ required_error: 'Country is required' })
    .min(1, 'Country is required'),
  languages: z
    .array(LanguageSchema, { required_error: 'Languages are required' })
    .min(1, 'At least one language is required')
    .max(4, 'Maximum of 4 languages allowed'),

  // Experience
  experience: z.array(
    z
      .object({
        title: z
          .string({ required_error: 'Job title is required' })
          .min(1, 'Job title is required'),
        company: z
          .string({ required_error: 'Company is required' })
          .min(1, 'Company is required'),
        location: z
          .string({ required_error: 'Location is required' })
          .min(1, 'Location is required'),
        country: z
          .string({ required_error: 'Country is required' })
          .min(1, 'Country is required'),
        city: z
          .string({ required_error: 'City is required' })
          .min(1, 'City is required'),
        state: z
          .string({ required_error: 'State is required' })
          .min(1, 'State is required'),
        startDate: z.date({ required_error: 'Start date is required' }),
        endDate: z.date({ required_error: 'End date is required' }).optional(),
        description: z
          .string({ required_error: 'Description is required' })
          .min(1, 'Description is required'),
        current: z.boolean().default(false),
      })
      .refine(
        (data) => {
          if (data.current) {
            return true; // If current is true, endDate is not required
          }
          return !!data.endDate; // If current is false, endDate is required
        },
        {
          message: 'End date is required unless this is your current position',
          path: ['endDate'],
        }
      )
  ),

  // Education
  education: z.array(
    z
      .object({
        school: z
          .string({ required_error: 'School is required' })
          .min(1, 'School is required'),
        degree: z
          .string({ required_error: 'Degree is required' })
          .min(1, 'Degree is required'),
        fieldOfStudy: z
          .string({ required_error: 'Field of study is required' })
          .min(1, 'Field of study is required'),
        startDate: z.date({ required_error: 'Start date is required' }),
        endDate: z.date({ required_error: 'End date is required' }).optional(),
        description: z.string().optional(),
        currentlyStudying: z.boolean().default(false),
      })
      .refine(
        (data) => {
          if (data.currentlyStudying) {
            return true; // If currentlyStudying is true, endDate is not required
          }
          return !!data.endDate; // If currentlyStudying is false, endDate is required
        },
        {
          message:
            'End date is required unless you are currently studying here',
          path: ['endDate'],
        }
      )
  ),

  // Onboarding Progress
  onboardingStep: OnboardingStepEnum.default(
    OnboardingStepWorkerProfileB.PERSONAL_INFO
  ),
});

export type WorkerOnboardingSchema = z.infer<typeof workerOnboardingSchema>;

export const onboardingOptions = {
  skills: onboardingData.skills,
  experienceLevels: onboardingData.experienceLevels,
  languages: onboardingData.languages,
  proficiencyLevels: onboardingData.proficiencyLevels,
};
