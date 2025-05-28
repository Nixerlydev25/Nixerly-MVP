import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./lib/routes";
import { API_ROUTES } from "./constants/routes";
import {
  OnboardingStepWorker,
  OnboardingStepBusiness,
} from "./types/onboarding";
import { parseCookies } from "./lib/utils";

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}${API_ROUTES.USER.GET_CURRENT_USER}`;
const API_URL = `https://api.nixerly.com/v1${API_ROUTES.USER.GET_CURRENT_USER}`;

const COOKIE_HEADER = "cookie";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const ONBOARDING_STEP_MAP: Record<string, string | null> = {
  PERSONAL_INFO: OnboardingStepWorker.PERSONAL_INFO,
  SKILLS_HOURLY_RATE_INFO: OnboardingStepWorker.SKILLS_HOURLY_RATE_INFO,
  EXPERIENCE_INFO: OnboardingStepWorker.EXPERIENCE_INFO,
  EDUCATION_INFO: OnboardingStepWorker.EDUCATION_INFO,
  LANGUAGE_INFO: OnboardingStepWorker.LANGUAGE_INFO,
  AVAILABILITY_INFO: OnboardingStepWorker.AVAILABILITY_INFO,
  COMPLETED: null,
};

function handleOnboardingRedirectWorkerProfile(
  request: NextRequest,
  workerProfile: { onboardingStep: string }
) {
  if (workerProfile.onboardingStep !== "COMPLETED") {
    const mappedStep = ONBOARDING_STEP_MAP[workerProfile.onboardingStep];
    const onboardingUrl = `${ROUTES.ONBOARDING}?onboarding-step=${mappedStep}`;
    const isOnOnboarding = request.nextUrl.pathname.startsWith(
      ROUTES.ONBOARDING
    );
    const currentStep = request.nextUrl.searchParams.get("onboarding-step");

    if (!isOnOnboarding || (isOnOnboarding && currentStep !== mappedStep)) {
      return NextResponse.redirect(new URL(onboardingUrl, request.url));
    }
    return null;
  }

  if (workerProfile.onboardingStep === "COMPLETED") {
    if (request.nextUrl.pathname.startsWith(ROUTES.ONBOARDING)) {
      return NextResponse.redirect(new URL(ROUTES.WORKER_FEED, request.url));
    }
  }

  if(request.nextUrl.pathname.startsWith("/business")){
    return NextResponse.redirect(new URL(ROUTES.WORKER_FEED, request.url));
  }

  return null;
}

const BUSINESS_ONBOARDING_STEP_MAP: Record<string, string | null> = {
  COMPANY_INFO: OnboardingStepBusiness.COMPANY_INFO,
  // BUSINESS_DETAILS: OnboardingStepBusiness.BUSINESS_DETAILS,
  // REVIEW: OnboardingStepBusiness.REVIEW,
  COMPLETED: null,
};

function handleOnboardingRedirectBusinessProfile(
  request: NextRequest,
  businessProfile: { onboardingStep: string }
) {
  if (businessProfile.onboardingStep !== "COMPLETED") {
    const mappedStep =
      BUSINESS_ONBOARDING_STEP_MAP[businessProfile.onboardingStep];
    const onboardingUrl = `${ROUTES.ONBOARDING}?onboarding-step=${mappedStep}`;
    const isOnOnboarding = request.nextUrl.pathname.startsWith(
      ROUTES.ONBOARDING
    );
    const currentStep = request.nextUrl.searchParams.get("onboarding-step");

    if (!isOnOnboarding || (isOnOnboarding && currentStep !== mappedStep)) {
      return NextResponse.redirect(new URL(onboardingUrl, request.url));
    }
    return null;
  }

  if (businessProfile.onboardingStep === "COMPLETED") {
    if (request.nextUrl.pathname.startsWith(ROUTES.ONBOARDING)) {
      return NextResponse.redirect(new URL(ROUTES.BUSINESS_FEED, request.url));
    }
  }

  if(request.nextUrl.pathname.startsWith("/worker")){
    return NextResponse.redirect(new URL(ROUTES.BUSINESS_FEED, request.url));
  }

  return null;
}

export async function middleware(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get(COOKIE_HEADER) || "";
    const cookies = parseCookies(cookieHeader);

    const accessToken = cookies[ACCESS_TOKEN];
    const refreshToken = cookies[REFRESH_TOKEN];

    console.log({
      accessToken,
      refreshToken,
    });

    // If no tokens are found, redirect to sign-in
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
    }

    // Validate tokens by calling the "current user" API
    const apiResponse = await fetch(API_URL, {
      headers: {
        Cookie: `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`,
      },
      credentials: "include",
    });

    // Log the response data
    const data = await apiResponse.json();
    console.log("apiResponse data", data);

    // If API response is not OK, redirect to sign-in
    if (!apiResponse.ok) {
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
    }

    // Check onboarding status for worker profiles
    if (data.workerProfile?.onboardingStep) {
      console.log("workerProfilea", data.workerProfile);
      const redirectResponse = handleOnboardingRedirectWorkerProfile(
        request,
        data.workerProfile
      );
      if (redirectResponse) return redirectResponse;
    }

    // Check onboarding status for business profiles
    if (data.businessProfile?.onboardingStep) {
      const redirectResponse = handleOnboardingRedirectBusinessProfile(
        request,
        data.businessProfile
      );
      if (redirectResponse) return redirectResponse;
    }

    // Proceed if validation passes
    return NextResponse.next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Middleware error:", error.message);
    } else {
      console.error("Middleware error:", error);
    }
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    // Protect user-related routes
    "/onboarding",
    "/onboarding/:path*",

    "/user/:path*", // e.g., /user/profile, /user/settings

    // Protect dashboard-related routes
    "/feed",
    "/feed/:path*", // e.g., /dashboard/overview, /dashboard/stats

    // Protect settings-related routes
    "/settings/:path*", // e.g., /settings/account, /settings/privacy

    "/worker/:path*",
    "/business/:path*",
  ],
};
