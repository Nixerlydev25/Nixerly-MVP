import { useMutation, useQuery } from "@tanstack/react-query";
import EducationsService, { Education } from "@/services/educations/educations.service";
import { QueryKeys } from "@/querykey";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "@/providers/query.provider";

export const useGetEducations = () => {
  return useQuery<Education[]>({
    queryKey: [QueryKeys.GET_EDUCATIONS],
    queryFn: EducationsService.getEducations,
  });
};

export const useCreateEducation = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_EDUCATIONS],
    mutationFn: (data: WorkerOnboardingSchema['education']) =>
      EducationsService.createEducation(data),
    onSuccess: () => {
      toast.success("Education created successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export const useUpdateEducation = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_EDUCATIONS],
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkerOnboardingSchema['education'][number]> }) =>
      EducationsService.updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export const useDeleteEducation = () => {
  return useMutation({
    mutationKey: [QueryKeys.DELETE_EDUCATIONS],
    mutationFn: (id: string) => EducationsService.deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export const useUpdateAllEducation = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_EDUCATIONS],
    mutationFn: (data: WorkerOnboardingSchema['education']) => EducationsService.updateAllEducations(data),
    onSuccess: () => {
      toast.success("Education updated successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};
