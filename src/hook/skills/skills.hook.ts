import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SkillsService, { Skill } from "@/services/skills/skills.service";
import { QueryKeys } from "@/querykey";
import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";

export const useGetSkills = () => {
  return useQuery<Skill[]>({
    queryKey: [QueryKeys.GET_SKILLS],
    queryFn: SkillsService.getSkills,
  });
};

export const useCreateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_SKILLS],
    mutationFn: (data: {skills: WorkerOnboardingSchema['skills']}) => SkillsService.createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SKILLS] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      SkillsService.updateSkill(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SKILLS] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => SkillsService.deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_SKILLS] });
    },
  });
};
