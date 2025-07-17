"use client";

import { useUser } from "@/hook/user/useUser";
import { ROUTES } from "@/lib/routes";
import { ProfileType } from "@/types/user/user.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hammer,
} from "lucide-react";
import { UpgradePro } from "./upgrade-pro";
import Image from "next/image";

export function DashboardSidebar() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  if (isLoading || !user) {
    return (
      <aside className="w-64 bg-[#F8F8FC] min-h-[calc(100vh-4rem)]">
        <div className="p-6">
          <nav className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  const isBusinessProfile = user.defaultProfile === ProfileType.BUSINESS;

  const businessLinks = [
    {
      href: ROUTES.MY_BUSINESS_PROFILE,
      label: "Business profile",
      image: "/myProfile.svg",
    },
    {
      href: ROUTES.BUSINESS_FEED,
      label: "Find Talent",
      image: "/findJobs.svg",
    },
    {
      href: ROUTES.MY_JOBS,
      label: "My Jobs",
      image: "/myJob.svg",
    },
    {
      href: ROUTES.POST_A_JOB,
      label: "Post a Job",
      image: "/findTalent.svg",
    },
  ];

  const workerLinks = [
    {
      href: ROUTES.MY_WORKER_PROFILE,
      label: "My Profile",
      image: "/myProfile.svg",
    },
    {
      href: ROUTES.WORKER_FEED,
      label: "Find Jobs",
      image: "/findJobs.svg",
    },
    {
      href: ROUTES.APPLIED_JOBS,
      label: "Applied Jobs",
      image: "/findTalent.svg",
    },
  ];

  const links = isBusinessProfile ? businessLinks : workerLinks;

  return (
    <aside className="w-64 bg-[#F8F8FC] min-h-screen flex flex-col overflow-hidden">
      <div className="p-4">
        <Link href={isBusinessProfile ? ROUTES.BUSINESS_FEED : ROUTES.WORKER_FEED} className="flex items-center gap-2">
          <Hammer className="h-8 w-8 text-blue-600" />
          <span className="text-lg font-bold text-blue-600">Nixerly</span>
        </Link>
      </div>
      <div className="p-6">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                  isActive
                    ? "bg-[#1E64D31A] text-nixerly-blue"
                    : "hover:bg-[#1E64D31A] text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
                    isActive ? "bg-nixerly-blue text-white border-nixerly-blue" : "bg-[#1E64D31A]"
                  )}
                >
                  <Image
                    src={link.image}
                    alt={link.label}
                    width={20}  
                    height={20}
                    className={isActive ? "filter invert brightness-0" : ""}
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{link.label}</p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Upgrade Pro Card at the bottom */}
      <div className="mt-auto">
        <UpgradePro />
      </div>
    </aside>
  );
} 