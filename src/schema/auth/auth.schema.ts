import { ProfileType } from "@/types/user/user.types";
import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Base schema with common fields for both professional and business
const baseSignUpSchema = {
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions"
  })
};

// Professional schema
export const professionalSignUpSchema = z.object({
  ...baseSignUpSchema,
  profileType: z.literal(ProfileType.WORKER),
});

// Business schema with additional company name field
export const businessSignUpSchema = z.object({
  ...baseSignUpSchema,
  profileType: z.literal(ProfileType.BUSINESS),
});

// Create a discriminated union based on profileType
export const signUpSchema = z.discriminatedUnion("profileType", [
  professionalSignUpSchema,
  businessSignUpSchema,
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ProfessionalSignUpFormValues = z.infer<typeof professionalSignUpSchema>;
export type BusinessSignUpFormValues = z.infer<typeof businessSignUpSchema>;