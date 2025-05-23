import { z } from 'zod';

export enum JobApplicationDuration {
  LESS_THAN_ONE_WEEK = 'LESS_THAN_ONE_WEEK',
  ONE_2_TWO_WEEKS = 'ONE_2_TWO_WEEKS',
  TWO_2_FOUR_WEEKS = 'TWO_2_FOUR_WEEKS',
  ONE_2_THREE_MONTHS = 'ONE_2_THREE_MONTHS',
  MORE_THAN_THREE_MONTHS = 'MORE_THAN_THREE_MONTHS',
}

export const durationOptions = [
  {
    value: JobApplicationDuration.LESS_THAN_ONE_WEEK,
    label: 'Less than 1 week',
  },
  { value: JobApplicationDuration.ONE_2_TWO_WEEKS, label: '1-2 weeks' },
  { value: JobApplicationDuration.TWO_2_FOUR_WEEKS, label: '2-4 weeks' },
  { value: JobApplicationDuration.ONE_2_THREE_MONTHS, label: '1-3 months' },
  {
    value: JobApplicationDuration.MORE_THAN_THREE_MONTHS,
    label: 'More than 3 months',
  },
] as const;

export const applicationFormSchema = z.object({
  coverLetter: z
    .string()
    .min(50, { message: 'Your proposal must be at least 50 characters.' }),
  proposedRate: z
    .number().optional(),
  availability: z.string().min(1, 'Tell us your availability'),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions.' }),
  }),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

export type JobApplicationSubmitData = Omit<
  ApplicationFormValues,
  'termsAccepted'
>;
