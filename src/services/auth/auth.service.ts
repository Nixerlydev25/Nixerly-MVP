import instance from "../api";
import { SignUpRequest, SignInRequest, AuthResponse, User } from "../../types/auth";
import { API_ROUTES } from "../../constants/api";

class AuthService {
  static async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await instance.post(API_ROUTES.AUTH.SIGN_UP, data);
      return response.data;
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  }

  static async signIn(data: SignInRequest): Promise<AuthResponse> {
    try{
      const response = await instance.post(API_ROUTES.AUTH.SIGN_IN, data);
      return response.data; 
    } catch (error) {
      console.error("Error during sign in:", error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await instance.get(API_ROUTES.AUTH.SIGN_OUT);
    } catch (error) {
      console.error("Error during sign out:", error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await instance.get(API_ROUTES.AUTH.CURRENT_USER);
      return response.data;
    } catch (error) {
      console.error("Error during getting current user:", error);
      throw error;
    }
  }
}

export default AuthService;