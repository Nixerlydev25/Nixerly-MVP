import { QueryKeys } from '@/querykey';
import UserService from '@/services/user/user.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  TBusinessProfile,
  TBusinessProfileResponse,
  TUser,
} from '@/types/auth';
import { currentUserData } from '@/types/user/user.types';
import { queryClient } from '@/providers/query.provider';
import { toast } from 'sonner';
import { OnboardingStepWorkerProfileB } from '@/types/onboarding';
import { WorkerUser } from '@/types/worker.types';

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: (data: Partial<TUser>) => UserService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error('Error during updating user:', error);
      throw error;
    },
  });
};

export const useUpdateWorkerProfile = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_WORKER_PROFILE],
    mutationFn: (data: {
      title?: string;
      description?: string;
      city?: string;
      state?: string;
      country?: string;
      hourlyRate?: number;
      availability?: boolean;
      onboardingStep?: OnboardingStepWorkerProfileB;
    }) => UserService.updateWorkerProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
      });
    },
    onError: (error: unknown) => {
      console.error('Error during updating worker profile:', error);
      throw error;
    },
  });
};

export const useUpdateBusinessProfile = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_BUSINESS_PROFILE],
    mutationFn: (data: TBusinessProfile) =>
      UserService.updateBusinessProfile(data),
    onSuccess: () => {
      toast.success('Business onboarding completed successfully!');
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.BUSINESS_PROFILE_DETAILS],
      });
    },
    onError: (error: unknown) => {
      console.error('Error during updating business profile:', error);
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
  return useQuery<WorkerUser>({
    queryKey: [QueryKeys.WORKER_PROFILE_DETAILS],
    queryFn: UserService.getCurrentWorkerProfileDetails,
  });
};

export const useGetCurrentBusinessProfileDetails = () => {
  return useQuery<TBusinessProfileResponse>({
    queryKey: [QueryKeys.BUSINESS_PROFILE_DETAILS],
    queryFn: UserService.getCurrentBusinessProfileDetails,
  });
};
