"use client";

import React from "react";
import { useUser } from "@/hook/user/useUser";
import { ProfileType } from "@/types/user/user.types";
import BusinessFeed from "./_components/BusinessFeed";
import WorkerFeed from "./_components/WorkerFeed";
import SkeletonFeed from "./_components/SkeletonFeed";

type feedComponents = {
  [key in ProfileType]: React.ComponentType;
};

function Page() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <SkeletonFeed />;
  }

  const profile: feedComponents = {
    [ProfileType.BUSINESS]: BusinessFeed,
    [ProfileType.WORKER]: WorkerFeed,
  };

  const Feed = profile[user?.defaultProfile as ProfileType];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Feed />
    </div>
  );
}

export default Page;
