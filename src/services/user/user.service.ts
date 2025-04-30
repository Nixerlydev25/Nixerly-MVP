import instance from "../api";
import { currentUserData } from "@/types/user/user.types";
import { User } from "@/types/auth";
import { API_ROUTES } from "@/constants/api";
import { UserUpdateData } from "@/hook/user/user.hooks";

class UserService {
  static async updateUser(data: UserUpdateData): Promise<User> {
    try {
      const response = await instance.patch(API_ROUTES.USER.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      console.error("Error during updating user:", error);
      throw error;
    }
  }

  static async getUser(): Promise<User> {
    try {
      const response = await instance.get(API_ROUTES.USER.GET_USER);
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
}

export default UserService;