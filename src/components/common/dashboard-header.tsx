"use client";

import { useLogout } from "@/hook/auth/auth.hook";
import { useUser } from "@/hook/user/useUser";
import { ROUTES } from "@/lib/routes";
import { ProfileType } from "@/types/user/user.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  const { mutate: logout } = useLogout();
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading || !user) {
    return (
      <header className="h-16 bg-white">
        <div className="container mx-auto h-full flex items-center justify-end px-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </header>
    );
  }

  const isBusinessProfile = user.defaultProfile === ProfileType.BUSINESS;

  const handleProfileClick = () => {
    if (isBusinessProfile) {
      router.push(ROUTES.MY_BUSINESS_PROFILE);
    } else {
      router.push(ROUTES.MY_WORKER_PROFILE);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-16 bg-white border rounded-tl-2xl">
      <div className="mx-4 h-full flex items-center justify-end px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src={
                  isBusinessProfile
                    ? user.businessProfile?.profilePicture ||
                      "/placeholder.svg?height=32&width=32"
                    : user.workerProfile?.profilePicture ||
                      "/placeholder.svg?height=32&width=32"
                }
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
                alt={`${user.firstName} ${user.lastName}'s avatar`}
              />
              <span className="text-sm font-medium ml-2">
                {isBusinessProfile
                  ? user.businessProfile?.companyName
                  : `${user.firstName} ${user.lastName}`}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleProfileClick}
              className="cursor-pointer"
            >
              <UserCircle2Icon className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 