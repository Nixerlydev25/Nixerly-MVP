"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hook/user/useUser";
import { ProfileType } from "@/types/user/user.types";
import SkeletonFeed from "../business/feed/_components/SkeletonFeed";
import { ROUTES } from "@/lib/routes";

function Page() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.defaultProfile === ProfileType.BUSINESS) {
        router.push(ROUTES.BUSINESS_FEED);
      } else if (user.defaultProfile === ProfileType.WORKER) {
        router.push(ROUTES.WORKER_FEED);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <SkeletonFeed />;
  }

  return null;
}

export default Page;
