import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EducationsService, { Education } from "@/services/educations/educations.service";
import { QueryKeys } from "@/querykey";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetEducations = () => {
  return useQuery<Education[]>({
    queryKey: [QueryKeys.GET_EDUCATIONS],
    queryFn: EducationsService.getEducations,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
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
  const queryClient = useQueryClient();
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
  const queryClient = useQueryClient();
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
