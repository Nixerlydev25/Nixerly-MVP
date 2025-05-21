import instance from "../api";
import { currentUserData } from "@/types/user/user.types";
import { TUser, TWorkerProfile, TBusinessProfile, TBusinessProfileResponse } from "@/types/auth";
import { API_ROUTES } from "@/constants/routes";
import { WorkerUser } from "@/types/worker.types";

class UserService {
  static async updateUser(data: Partial<TUser>): Promise<TUser> {
    try {
      console.log(data, "data is here");
      const response = await instance.patch(API_ROUTES.USER.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      console.error("Error during updating user:", error);
      throw error;
    }
  }

  static async updateWorkerProfile(data: {
    title?: string;
    description?: string;
    city?: string;
    state?: string;
    country?: string;
    hourlyRate?: number;
    availability?: boolean;
  }): Promise<TWorkerProfile> {
    try {
      const response = await instance.patch(
        API_ROUTES.WORKER.UPDATE_WORKER_PROFILE,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error during updating worker profile:", error);
      throw error;
    }
  }

  static async updateBusinessProfile(
    data: TBusinessProfile
  ): Promise<TBusinessProfile> {
    try {
      const response = await instance.patch(
        API_ROUTES.BUSINESS.UPDATE_BUSINESS_PROFILE,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error during updating business profile:", error);
      throw error;
    }
  }

  static async getUser(): Promise<TUser> {
    try {
      const response = await instance.get(API_ROUTES.USER.GET_CURRENT_USER);
      return response.data;
    } catch (error) {
      console.error("Error during getting user:", error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<currentUserData> {
    try {
      return instance.get(API_ROUTES.USER.GET_CURRENT_USER);
    } catch (error) {
      console.error("Error during getting current user:", error);
      throw error;
    }
  }

  static async getCurrentWorkerProfileDetails(): Promise<WorkerUser> {
    try {
      const response = await instance.get(
        API_ROUTES.USER.WORKER_PROFILE_DETAILS
      );
      return response.data;
    } catch (error) {
      console.error("Error during getting worker profile details:", error);
      throw error;
    }
  }

  static async getCurrentBusinessProfileDetails(): Promise<TBusinessProfileResponse> {
    try {
      const response = await instance.get(
        API_ROUTES.USER.BUSINESS_PROFILE_DETAILS
      );
      return response.data;
    } catch (error) {
      console.error("Error during getting business profile details:", error);
      throw error;
    }
  }
}

export default UserService;
