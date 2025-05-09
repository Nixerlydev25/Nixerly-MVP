export const API_ROUTES = {
  AUTH: {
    SIGN_UP: '/auth/sign-up',
    SIGN_IN: '/auth/sign-in',
    SIGN_OUT: '/auth/logout',
    CURRENT_USER: '/auth/me',
    GOOGLE_AUTH: '/auth/google',
    REFRESH: '/auth/refresh',
    RESET_PASSWORD: '/auth/reset-password',
    DELETE_ACCOUNT: '/auth/delete-account',
    PASSWORD_RECOVERY: '/auth/password-recovery',
    IS_AUTHENTICATED: '/auth/is-authenticated',
    OAUTH: {
      GOOGLE: '/auth/google',
      GOOGLE_CALLBACK: '/auth/google/callback'
    }
  },
  USER: {
    BY_ID: (id: string) => `/user/${id}`,
    UPDATE_WORKER_PROFILE: '/update-worker-profile',
    UPDATE_BUSINESS_PROFILE: '/update-business-profile',
    UPDATE_USER: '/update-user',
    GET_USER: '/user/me',
    TOGGLE_FIRST_TIME_LOGIN: '/user/toggle-first-time-login',
    GET_CURRENT_USER: '/user/current-user',
    DELETE_ACCOUNT: '/user/delete-account',
    FORGOT_PASSWORD: '/user/forgot-password',
    VERIFY_OTP: '/user/verify-otp',
    RESET_PASSWORD: '/user/reset-password'
  },
  OTP: {
    SEND: '/otp/send-otp',
    VERIFY: '/otp/verify-otp'
  },
  ROLES: {
    UPDATE: (id: string) => `/roles/${id}`
  },
  RESTRICTIONS: {
    ROOT: '/restrictions/',
    USER_RESTRICTIONS: (userId: string) => `/restrictions/${userId}`
  },
  HEALTH: '/health',
  SUBSCRIPTION: '/subscription'
};