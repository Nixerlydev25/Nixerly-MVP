import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./lib/routes";
import { API_ROUTES } from "./constants/api";
import { OnboardingStep } from "./types/onboarding";

const API_URL = process.env.API_URL || `http://localhost:4000/v1/${API_ROUTES.USER.GET_CURRENT_USER}`;
const COOKIE_HEADER = "cookie";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    const items = cookieHeader.split(";");
    items.forEach((item: string) => {
      const [key, value] = item.split("=");
      cookies[key.trim()] = value?.trim();
    });
  }
  return cookies;
}

export async function middleware(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get(COOKIE_HEADER) || "";
    const cookies = parseCookies(cookieHeader);

    const accessToken = cookies[ACCESS_TOKEN];
    const refreshToken = cookies[REFRESH_TOKEN];
    
    console.log({
      accessToken,
      refreshToken
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
    if (data.workerProfile && data.workerProfile.onboardingStep > 0) {
      const onboardingSteps = [
        OnboardingStep.PERSONAL_INFO,
        OnboardingStep.PROFESSIONAL_INFO, 
        OnboardingStep.EDUCATIONAL_INFO,
        OnboardingStep.REVIEW
      ];
      
      const currentStep = onboardingSteps[data.workerProfile.onboardingStep - 1];
      const onboardingUrl = `${ROUTES.ONBOARDING}?onboarding-step=${currentStep}`;

      const isOnOnboarding = request.nextUrl.pathname.startsWith(ROUTES.ONBOARDING);

      // Only redirect to onboarding if not already on an onboarding page
      if (!isOnOnboarding) {
        return NextResponse.redirect(new URL(onboardingUrl, request.url));
      }
    }

    // Redirect completed users away from onboarding
    if (!data.workerProfile?.onboardingStep && 
        request.nextUrl.pathname.startsWith(ROUTES.ONBOARDING)) {
      return NextResponse.redirect(new URL(ROUTES.FEED, request.url));
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
    "/settings/:path*" // e.g., /settings/account, /settings/privacy
  ],
};