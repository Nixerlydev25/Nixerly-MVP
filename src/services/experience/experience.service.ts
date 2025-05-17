import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

export interface Experience {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

class ExperiencesService {
  static async getExperiences(): Promise<Experience[]> {
    const response = await instance.get(API_ROUTES.EXPERIENCE.LIST);
    return response.data;
  }

  static async getExperience(id: string): Promise<Experience> {
    const response = await instance.get(API_ROUTES.EXPERIENCE.BY_ID(id));
    return response.data;
  }

  static async createExperience(data: WorkerOnboardingSchema['experience']): Promise<Experience> {
    const response = await instance.post(API_ROUTES.EXPERIENCE.CREATE, data);
    return response.data;
  }

  static async updateExperience(id:string, data: WorkerOnboardingSchema['experience'][number]): Promise<Experience> {
    const response = await instance.patch(API_ROUTES.EXPERIENCE.UPDATE(id), data);
    return response.data;
  }

  static async updateAllExperience(data: WorkerOnboardingSchema['experience']): Promise<Experience> {
    const response = await instance.put(API_ROUTES.EXPERIENCE.UPDATE_ALL, data);
    return response.data;
  }

  static async deleteExperience(id: string): Promise<void> {
    await instance.delete(API_ROUTES.EXPERIENCE.DELETE(id));
  }
}

export default ExperiencesService;
