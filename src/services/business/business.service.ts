import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

interface BusinessUser {
  firstName: string;
  lastName: string;
  defaultProfile: string;
  email: string;
}

interface BusinessJob {
  id: string;
  title: string;
  description: string;
  requirements: string;
  employmentType: string;
  numberOfPositions: number;
  budget: number;
  hourlyRateMin: number;
  hourlyRateMax: number;
  status: string;
}

interface Business {
  id: string;
  userId: string;
  companyName: string;
  description: string;
  industry: string;
  city: string;
  state: string;
  country: string;
  website: string;
  employeeCount: number;
  yearFounded: number;
  totalSpent: number;
  postedJobs: number;
  onboardingStep: string;
  user: BusinessUser;
  jobs: BusinessJob[];
}

class BusinessService {
  static async getBusinessById(id: string): Promise<Business> {
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
