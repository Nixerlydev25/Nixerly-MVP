"use client";

import { useUser } from "@/hook/user/useUser";
import { ROUTES } from "@/lib/routes";
import { ProfileType } from "@/types/user/user.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  BuildingIcon,
  SearchIcon,
  UserCircle2Icon,
} from "lucide-react";

export function DashboardSidebar() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  if (isLoading || !user) {
    return (
      <aside className="w-64 border-r bg-white min-h-[calc(100vh-4rem)]">
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
      label: "Company Profile",
      icon: UserCircle2Icon,
    },
    {
      href: ROUTES.BUSINESS_FEED,
      label: "Find Talent",
      icon: SearchIcon,
    },
    {
      href: ROUTES.MY_JOBS,
      label: "My Jobs",
      icon: BriefcaseIcon,
    },
    {
      href: ROUTES.POST_A_JOB,
      label: "Post a Job",
      icon: BuildingIcon,
    },
  ];

  const workerLinks = [
    {
      href: ROUTES.MY_WORKER_PROFILE,
      label: "My Profile",
      icon: UserCircle2Icon,
    },
    {
      href: ROUTES.WORKER_FEED,
      label: "Find Jobs",
      icon: SearchIcon,
    },
    {
      href: ROUTES.APPLIED_JOBS,
      label: "Applied Jobs",
      icon: BriefcaseIcon,
    },
  ];

  const links = isBusinessProfile ? businessLinks : workerLinks;

  return (
    <aside className="w-64 border-r bg-white min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
} 