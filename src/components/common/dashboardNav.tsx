"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BriefcaseIcon, MenuIcon, UserCircle2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLogout } from "@/hook/auth/auth.hook";
import { useUser } from "@/hook/user/useUser";
import { ProfileType } from "@/types/user/user.types";
import { ROUTES } from "@/lib/routes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function DashboardNav() {
  const { mutate: logout } = useLogout();
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading || !user) {
    return <div></div>;
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
          <Link
            href={isBusinessProfile ? ROUTES.BUSINESS_FEED : ROUTES.WORKER_FEED}
            className="flex items-center gap-2 cursor-pointer"
          >
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Nixerly</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {isBusinessProfile ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Talent</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={ROUTES.BUSINESS_FEED}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            >
                              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Browse Talent
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Find and connect with skilled professionals for your projects
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <Link
                            href={ROUTES.MY_JOBS}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">My Jobs</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage your posted jobs and applications
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link
                            href={ROUTES.POST_A_JOB}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Post a Job</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Create a new job posting
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Jobs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              href={ROUTES.WORKER_FEED}
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            >
                              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Browse Jobs
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Discover new job opportunities that match your skills
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <NavigationMenuLink asChild>
                          <Link
                            href={ROUTES.APPLIED_JOBS}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Applied Jobs</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Track your job applications
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                <Image
                  src={
                    isBusinessProfile
                      ? user.businessProfile?.profilePicture || "/placeholder.svg?height=32&width=32"
                      : user.workerProfile?.profilePicture || "/placeholder.svg?height=32&width=32"
                  }
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-full h-full"
                  alt={`${user.firstName} ${user.lastName}'s avatar`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
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
      </div>
    </header>
  );
}

export default DashboardNav;
