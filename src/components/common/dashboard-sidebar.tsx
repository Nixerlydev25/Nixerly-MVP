"use client";

import { useUser } from "@/hook/user/useUser";
import { ROUTES } from "@/lib/routes";
import { ProfileType } from "@/types/user/user.types";
import { useSidebarStore } from "@/store/sidebar.store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hammer,
  X,
} from "lucide-react";
import { UpgradePro } from "./upgrade-pro";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Base sidebar component with shared logic
function BaseSidebar({ className = "" }: { className?: string }) {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const { isOpen, close } = useSidebarStore();

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      close();
    }
  };

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
    <aside className={cn("w-64 bg-[#F8F8FC] min-h-screen flex flex-col overflow-hidden", className)}>
      <div className="p-4 flex items-center justify-between">
        <Link href={isBusinessProfile ? ROUTES.BUSINESS_FEED : ROUTES.WORKER_FEED} className="flex items-center gap-2">
          <Hammer className="h-8 w-8 text-blue-600" />
          <span className="text-lg font-bold text-blue-600">Nixerly</span>
        </Link>
        <button
          onClick={close}
          className="lg:hidden p-2 hover:bg-gray-200 rounded-md transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="p-6">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
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
      <div className="mt-auto">
        {/* <UpgradePro /> */}
      </div>
    </aside>
  );
}

// Mobile sidebar with animation
export function MobileSidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ x: -256, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -256, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:hidden fixed left-0 top-0 z-50"
        >
          <BaseSidebar className="shadow-lg" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop sidebar (always visible)
export function DesktopSidebar() {
  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen">
      <BaseSidebar />
    </div>
  );
}