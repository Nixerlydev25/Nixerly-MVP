import { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema";
import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

export interface Language {
  id: string;
  name: string;
}

class LanguagesService {
  static async createLanguage(data: {
    languages: WorkerOnboardingSchema["languages"];
  }): Promise<Language[]> {
    const response = await instance.post(API_ROUTES.LANGUAGE.CREATE, data);
    return response.data;
  }

  static async updateAllLanguages(data: {
    languages: Partial<WorkerOnboardingSchema["languages"]>;
  }): Promise<Language[]> {
    const response = await instance.put(API_ROUTES.LANGUAGE.UPDATE_ALL, data);
    return response.data;
  }

  //   static async updateLanguage(id: string, data: { name: string }): Promise<Language> {
  //     const response = await instance.patch(API_ROUTES.LANGUAGE.UPDATE(id), data);
  //     return response.data;
  //   }

  //   static async deleteLanguage(id: string): Promise<void> {
  //     await instance.delete(API_ROUTES.LANGUAGE.DELETE(id));
  //   }
}

export default LanguagesService;
