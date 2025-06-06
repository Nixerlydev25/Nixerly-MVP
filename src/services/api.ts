import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "https://api.nixerly.com/v1",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    // Show success toast for POST, PUT, PATCH, and DELETE requests
    const method = response.config.method?.toLowerCase();
    if (method && ['post', 'put', 'patch', 'delete'].includes(method)) {
      const successMessage = response.data?.message || getDefaultSuccessMessage(method);
      toast.success(successMessage);
    }
    return response;
  },
  (error) => {
    // Handle error responses with toast
    if (error.response) {
      const errorMessage = error.response.data?.message || 'An error occurred';
      toast.error(errorMessage);
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

// Helper function to generate default success messages
const getDefaultSuccessMessage = (method: string) => {
  switch (method) {
    case 'post':
      return 'Successfully created';
    case 'put':
    case 'patch':
      return 'Successfully updated';
    case 'delete':
      return 'Successfully deleted';
    default:
      return 'Operation successful';
  }
};

// const handle403 = () => {
//   instance.post("/auth/logout");
//   window.location.href = '/sign-in';
// };

interface CustomErrorResponse {
  message: string;
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
  response?: AxiosResponse<CustomErrorResponse>;
}

export default instance;