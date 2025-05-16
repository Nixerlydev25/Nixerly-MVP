import instance from "../api";
import { SignUpRequest, SignInRequest, AuthResponse, TUser } from "../../types/auth";
import { API_ROUTES } from "../../constants/routes";

class AuthService {
  static async signUp(data: SignUpRequest): Promise<AuthResponse> {
    try {
      return instance.post(API_ROUTES.AUTH.SIGN_UP, data);
    } catch (error) {
      console.error("Error during sign up:", error);
      throw error;
    }
  }

  static async signIn(data: SignInRequest): Promise<AuthResponse> {
    try{
      return instance.post(API_ROUTES.AUTH.SIGN_IN, data);
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

  static async getCurrentUser(): Promise<TUser> {
    try {
      return instance.get(API_ROUTES.AUTH.CURRENT_USER);
    } catch (error) {
      console.error("Error during getting current user:", error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await instance.get(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }
}

export default AuthService;