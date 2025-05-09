"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBusinessOnboardingNavigation } from "@/hook/onboarding/useBusinessOnboardingNavigation";
import { BusinessOnboardingSchema } from "@/schema/onboarding/business-onboarding.schema";
import { useUpdateUser } from "@/hook/user/user.hooks";
import { OnboardingStepBusinessProfileB } from "@/types/onboarding";

const industries = [
  { value: "construction", label: "Construction" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "engineering", label: "Engineering" },
  { value: "maintenance", label: "Maintenance & Repairs" },
  { value: "facility_management", label: "Facility Management" },
  { value: "renovation", label: "Renovation & Remodeling" },
  { value: "development", label: "Real Estate Development" },
  { value: "procurement", label: "Equipment & Materials Procurement" },
  { value: "consultant", label: "Consulting Services" },
  { value: "other", label: "Other" },
];

export function CompanyInfo() {
  const { control, trigger, watch } = useFormContext<BusinessOnboardingSchema>();
  const { nextStep } = useBusinessOnboardingNavigation();
  const { mutateAsync: updateUser } = useUpdateUser();
  const formData = watch();

  const handleContinue = async () => {
    const fieldsToValidate = [
      "companyName",
      "description",
      "industry"
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      await updateUser({
        onboardingStep : OnboardingStepBusinessProfileB.BUSINESS_DETAILS,
        businessProfile: {
          companyName: formData.companyName,
          description: formData.description,
          industry: formData.industry
        }
      });
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Company Information</h2>
        <p className="text-muted-foreground">
          Tell us about your company
        </p>
      </div>

      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your company name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Select the industry that best describes your business
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe what your company does" 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Provide a brief description of your company and the services you offer
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={handleContinue}>
          Next Step
        </Button>
      </div>
    </div>
  );
} 