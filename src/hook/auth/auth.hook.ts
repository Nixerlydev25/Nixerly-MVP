import { SignInRequest } from "../../types/auth";
import { QueryKeys } from "../../querykey";
import authService from "../../services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
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
      router.push(ROUTES.ONBOARDING);
    },
    onError: (error: unknown) => {
      console.error('Error during professional signup:', error);
      throw error;
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
      router.push(ROUTES.ONBOARDING);
    },
    onError: (error: unknown) => {
      console.error('Error during business signup:', error);
      throw error;
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
      router.push(ROUTES.FEED);
    },
    onError: (error: unknown) => {
      console.error('Error during sign in:', error);
      throw error;
    },
  });
};

export const useSignOut = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.SIGN_OUT],
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      router.push(ROUTES.SIGNIN);
    },
    onError: (error: unknown) => {
      console.error('Error during sign out:', error);
      throw error;
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.AUTH, QueryKeys.LOGOUT],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.replace(ROUTES.HOME);
    },
    onError: (error: unknown) => {
      console.error('Error during logout:', error);
      throw error;
    },
  });
};
