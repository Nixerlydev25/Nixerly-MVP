"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  BriefcaseIcon,
  MailIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLogout } from "@/hook/auth/auth.hook";
import SkeletonFeed from "@/app/(dashboard)/business/feed/_components/SkeletonFeed";
import { useUser } from "@/hook/user/useUser";
import { ProfileType } from "@/types/user/user.types";
import { ROUTES } from "@/lib/routes";

function DashboardNav() {
  const { mutate: logout } = useLogout();
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading || !user) {
    return <SkeletonFeed />;
  }

  const handleLogout = () => {
    logout();
  };

  const isBusinessProfile = user.defaultProfile === ProfileType.BUSINESS;

  const handleProfileClick = () => {
    if (isBusinessProfile) {
      router.push(ROUTES.MY_BUSINESS_PROFILE);
    } else {
      router.push(ROUTES.MY_WORKER_PROFILE);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Nixerly</span>
          </Link>
          <nav className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/feed"
              className="text-sm font-medium text-blue-600 hover:text-blue-600"
            >
              Find Talent
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              Why WorkHub
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for talent..."
              className="w-[300px] pl-9"
            />
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <BellIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MailIcon className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="User avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default DashboardNav;
