"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBusinessOnboardingNavigation } from "@/hook/onboarding/useBusinessOnboardingNavigation";
import { BusinessOnboardingSchema } from "@/schema/onboarding/business-onboarding.schema";
import { useUpdateBusinessProfile } from "@/hook/user/user.hooks";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { OnboardingStepBusinessProfileB } from "@/types/onboarding";

const industries = {
  construction: "Construction",
  manufacturing: "Manufacturing",
  engineering: "Engineering",
  maintenance: "Maintenance & Repairs",
  facility_management: "Facility Management",
  renovation: "Renovation & Remodeling",
  development: "Real Estate Development",
  procurement: "Equipment & Materials Procurement",
  consultant: "Consulting Services",
  other: "Other",
};

const getEmployeeCountNumber = (range: string): number => {
  if (range === "100+") return 100;
  const [min] = range.split("-");
  return parseInt(min, 10);
};

export function Review() {
  const { getValues, trigger } = useFormContext<BusinessOnboardingSchema>();
  const { prevStep } = useBusinessOnboardingNavigation();
  const { mutateAsync: updateBusinessProfile } = useUpdateBusinessProfile(false);
  const router = useRouter();
  const values = getValues();

  const handleComplete = async () => {
    const isValid = await trigger();
    if (isValid) {
      await updateBusinessProfile({
        ...values,
        employeeCount: getEmployeeCountNumber(values.employeeCount),
        onboardingStep: OnboardingStepBusinessProfileB.COMPLETED
      });
      router.push(ROUTES.FEED);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Review Your Information</h2>
        <p className="text-muted-foreground">
          Please review your business profile information
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Company Information</h3>
                <div className="border-t mt-2 pt-2">
                  <div className="py-1">
                    <span className="text-muted-foreground">Company Name:</span>
                    <p className="font-medium">{values.companyName}</p>
                  </div>
                  <div className="py-1">
                    <span className="text-muted-foreground">Industry:</span>
                    <p className="font-medium">{industries[values.industry as keyof typeof industries] || values.industry}</p>
                  </div>
                  <div className="py-1">
                    <span className="text-muted-foreground">Description:</span>
                    <p className="font-medium">{values.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Business Details</h3>
                <div className="border-t mt-2 pt-2">
                  <div className="py-1">
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{`${values.city || ''}, ${values.state || ''}, ${values.country || ''}`}</p>
                  </div>
                  <div className="py-1">
                    <span className="text-muted-foreground">Website:</span>
                    <p className="font-medium">{values.website || "Not provided"}</p>
                  </div>
                  <div className="py-1">
                    <span className="text-muted-foreground">Employees:</span>
                    <p className="font-medium">{values.employeeCount}</p>
                  </div>
                  <div className="py-1">
                    <span className="text-muted-foreground">Founded:</span>
                    <p className="font-medium">{values.yearFounded}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={prevStep}>
          Previous Step
        </Button>
        <Button type="button" onClick={handleComplete}>
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
} 