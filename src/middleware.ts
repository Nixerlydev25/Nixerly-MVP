import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./lib/routes";

const API_URL = process.env.API_URL || "http://localhost:4000/v1/user/current-user";
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

    if(data.onboardingCompleted && ROUTES.ONBOARDING === request.nextUrl.pathname && request.headers.get('referer')?.includes(ROUTES.ONBOARDING) !== true){
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

    "/user/:path*", // e.g., /user/profile, /user/settings

    // Protect dashboard-related routes
    "/feed",
    "/feed/:path*", // e.g., /dashboard/overview, /dashboard/stats

    // Protect settings-related routes
    "/settings/:path*" // e.g., /settings/account, /settings/privacy
  ],
};