import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExperienceService, { Experience } from "@/services/experience/experience.service";
import { QueryKeys } from "@/querykey";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";

export const useGetExperiences = () => {
  return useQuery<Experience[]>({
    queryKey: [QueryKeys.GET_EXPERIENCE],
    queryFn: ExperienceService.getExperiences,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkerOnboardingSchema['experience']) =>
      ExperienceService.createExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EXPERIENCE] });
    },
  });
};

export const useUpdateUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, data}: {id: string, data: WorkerOnboardingSchema['experience'][number]}) =>
      ExperienceService.updateExperience(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EXPERIENCE] });
    },
  });
};

export const useUpdateAllExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkerOnboardingSchema['experience']) =>
      ExperienceService.updateAllExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EXPERIENCE] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ExperienceService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_EXPERIENCE] });
    },
  });
};
