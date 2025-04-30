export const API_ROUTES = {
  AUTH: {
    SIGN_UP: `/auth/signup`,
    SIGN_IN: `/auth/signin`,
    SIGN_OUT: `/auth/logout`,
    CURRENT_USER: `/auth/me`,
    GOOGLE_AUTH: `/auth/google`,
  },
  USER: {
    BY_ID: (id: string) => `/user/${id}`,
    UPDATE_USER: `/user/update-user-details`,
    GET_USER: `/user/me`,
    TOGGLE_FIRST_TIME_LOGIN: `/user/toggle-first-time-login`,
    GET_CURRENT_USER: `/user/current-user`,
  },
};