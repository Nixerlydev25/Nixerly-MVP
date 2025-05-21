import { TBusinessDetails } from "@/types/auth";
import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

class BusinessService {
  static async getBusinessById(id: string): Promise<TBusinessDetails> {
    try {
      const response = await instance.get(
        API_ROUTES.BUSINESS.GET_BUSINESS_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error getting business by id:", error);
      throw error;
    }
  }
}

export default BusinessService;
