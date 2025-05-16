import { QueryKeys } from "@/querykey";
import UserService from "@/services/user/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TBusinessProfile, TUser, TWorkerProfile } from "@/types/auth";
import { currentUserData } from "@/types/user/user.types";
import { queryClient } from "@/providers/query.provider";
import { ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define the BusinessProfile interface
export interface BusinessProfile {
  companyName?: string;
  description?: string;
  industry?: string;
  location?: string;
  website?: string | null;
  employeeCount?: number;
  yearFounded?: number;
  onboardingStep?: string;
}

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: (data: Partial<TUser>) => UserService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating user:", error);
      throw error;
    },
  });
};

export const useUpdateWorkerProfile = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_WORKER_PROFILE],
    mutationFn: (data: TWorkerProfile) => UserService.updateWorkerProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating worker profile:", error);
      throw error;
    },
  });
};

export const useUpdateBusinessProfile = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_BUSINESS_PROFILE],
    mutationFn: (data: TBusinessProfile) =>
      UserService.updateBusinessProfile(data),
    onSuccess: () => {
      router.replace(ROUTES.FEED);
      toast.success("Business onboarding completed successfully!");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating business profile:", error);
      throw error;
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getUser,
  });
};

export const useGetCurrentUser = () => {
  return useQuery<currentUserData>({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getCurrentUser,
  });
};

export const useGetCurrentWorkerProfileDetails = () => {
  return useQuery<TWorkerProfile>({
    queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
    queryFn: UserService.getCurrentWorkerProfileDetails,
  });
};
