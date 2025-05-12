import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EducationsService, { Education } from "@/services/educations/educations.service";
import { QueryKeys } from "@/querykey";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";

export const useGetEducations = () => {
  return useQuery<Education[]>({
    queryKey: [QueryKeys.GET_EDUCATIONS],
    queryFn: EducationsService.getEducations,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkerOnboardingSchema['education']) =>
      EducationsService.createEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WorkerOnboardingSchema['education'][number]> }) =>
      EducationsService.updateEducation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => EducationsService.deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EDUCATIONS] });
    },
  });
};
