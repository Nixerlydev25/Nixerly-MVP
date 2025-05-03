"use client";

import { useUser } from "@/hook/user/useUser";
import { Loader2 } from "lucide-react";
import { BusinessOnboarding } from "./_components/BusinessOnboarding";
import { WorkerOnboarding } from "./_components/WorkerOnboarding";
import { ProfileType } from "@/types/user/user.types";

export default function OnboardingPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Default to worker onboarding if profileType is not specified
  // This maintains backward compatibility with existing user accounts
  const isBusinessProfile = user?.profileType === ProfileType.BUSINESS;

  return (
    <div className="container max-w-2xl mx-auto py-10">
      {isBusinessProfile ? <BusinessOnboarding /> : <WorkerOnboarding />}
    </div>
  );
}
