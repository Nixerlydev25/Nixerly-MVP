import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

export interface Skill {
  id: string;
  name: string;
}

class SkillsService {
  static async getSkills(): Promise<Skill[]> {
    const response = await instance.get(API_ROUTES.SKILLS.LIST);
    return response.data;
  }

  static async getSkill(id: string): Promise<Skill> {
    const response = await instance.get(API_ROUTES.SKILLS.BY_ID(id));
    return response.data;
  }

  static async createSkill(data: {skills: WorkerOnboardingSchema['skills']}): Promise<Skill> {
    const response = await instance.post(API_ROUTES.SKILLS.CREATE, data);
    return response.data;
  }

  static async updateSkill(id: string, data: { name: string }): Promise<Skill> {
    const response = await instance.patch(API_ROUTES.SKILLS.UPDATE(id), data);
    return response.data;
  }

  static async deleteSkill(id: string): Promise<void> {
    await instance.delete(API_ROUTES.SKILLS.DELETE(id));
  }
}

export default SkillsService;
