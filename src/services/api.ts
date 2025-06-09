import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "https://api.nixerly.com/v1",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 406) {
    //   handle403();
    // }
    return Promise.reject(error);
  }
);

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