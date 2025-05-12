import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import instance from "../api";
import { API_ROUTES } from "@/constants/api";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

class EducationsService {
  static async getEducations(): Promise<Education[]> {
    const response = await instance.get(API_ROUTES.EDUCATIONS.LIST);
    return response.data;
  }

  static async getEducation(id: string): Promise<Education> {
    const response = await instance.get(API_ROUTES.EDUCATIONS.BY_ID(id));
    return response.data;
  }

  static async createEducation(data: WorkerOnboardingSchema['education']): Promise<Education> {
    const response = await instance.post(API_ROUTES.EDUCATIONS.CREATE, data);
    return response.data;
  }

  static async updateEducation(id: string, data: Partial<WorkerOnboardingSchema['education'][number]>): Promise<Education> {
    const response = await instance.patch(API_ROUTES.EDUCATIONS.UPDATE(id), data);
    return response.data;
  }

  static async deleteEducation(id: string): Promise<void> {
    await instance.delete(API_ROUTES.EDUCATIONS.DELETE(id));
  }
}

export default EducationsService;
