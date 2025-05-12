import { SignInRequest } from "../../types/auth";
import { QueryKeys } from "../../querykey";
import authService from "../../services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {useRouter} from 'next/navigation';
import { ROUTES } from "@/lib/routes";
import { ProfessionalSignUpFormValues, BusinessSignUpFormValues } from "@/schema/auth/auth.schema";
import { ProfileType } from "@/types/user/user.types";
import { useUserStore } from "@/store/userStore";

export const useProfessionalSignUp = () => {
  const router = useRouter();
  const revalidateUser = useUserStore(state => state.revalidateUser);
  
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_UP, 'professional'],
    mutationFn: (data: ProfessionalSignUpFormValues) => authService.signUp({
      ...data,
      profileType: ProfileType.WORKER
    }),
    onSuccess: async () => {
      await revalidateUser();
      toast.success("Professional account created successfully!");
      router.push(ROUTES.ONBOARDING);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to create professional account");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export const useBusinessSignUp = () => {
  const router = useRouter();
  const revalidateUser = useUserStore(state => state.revalidateUser);
  
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_UP, 'business'],
    mutationFn: (data: BusinessSignUpFormValues) => authService.signUp({
      ...data,
      profileType: ProfileType.BUSINESS
    }),
    onSuccess: async () => {
      await revalidateUser();
      toast.success("Business account created successfully!");
      router.push(ROUTES.ONBOARDING);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to create business account");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  const revalidateUser = useUserStore(state => state.revalidateUser);
  
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_IN],
    mutationFn: (data: SignInRequest) => authService.signIn(data),
    onSuccess: async () => {
      await revalidateUser();
      toast.success("Signed in successfully!");
      router.push(ROUTES.FEED);
    },
    onError: (error: unknown) => {
      console.log(error.response.data.message,"message", error instanceof AxiosError);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to sign in");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_OUT],
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      toast.success("Signed out successfully!");
      router.push(ROUTES.SIGNIN);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to sign out");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};