"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hook/user/useUser";
import { ProfileType } from "@/types/user/user.types";
import SkeletonFeed from "./business/_components/SkeletonFeed";

function Page() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.defaultProfile === ProfileType.BUSINESS) {
        router.push("/feed/business");
      } else if (user.defaultProfile === ProfileType.WORKER) {
        router.push("/feed/worker");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <SkeletonFeed />;
  }

  return null;
}

export default Page;
