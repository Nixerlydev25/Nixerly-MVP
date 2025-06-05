'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BriefcaseIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useLogout } from '@/hook/auth/auth.hook';
import { useUser } from '@/hook/user/useUser';
import { ProfileType } from '@/types/user/user.types';
import { ROUTES } from '@/lib/routes';

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

  const handlePostAJob = () => {
    router.push(ROUTES.POST_A_JOB);
  };

  const handleMyJobs = () => {
    router.push(ROUTES.MY_JOBS);
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
            className="flex items-center gap-2"
          >
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Nixerly</span>
          </Link>
          {isBusinessProfile ? (
            <nav className="hidden md:flex md:items-center md:gap-6">
              <Link
                href={ROUTES.BUSINESS_FEED as string}
                className="text-sm font-medium text-blue-600 hover:text-blue-600"
              >
                Find Talent
              </Link>
              <Link
                href={ROUTES.MY_JOBS as string}
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                My Jobs
              </Link>
            </nav>
          ) : (
            <nav className="hidden md:flex md:items-center md:gap-6">
              <Link
                href={ROUTES.WORKER_FEED as string}
                className="text-sm font-medium text-blue-600 hover:text-blue-600"
              >
                Find Job
              </Link>
              <Link
                href={ROUTES.APPLIED_JOBS as string}
                className="text-sm font-medium text-blue-600 hover:text-blue-600"
              >
                Applied Jobs
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
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
              {isBusinessProfile && (
                <>
                  <DropdownMenuItem onClick={handleMyJobs}>
                    My Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handlePostAJob}>
                    Post A Job
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
                </>
              )}
              {!isBusinessProfile && (
                <DropdownMenuItem
                  onClick={() => router.push(ROUTES.APPLIED_JOBS)}
                >
                  Applied Jobs
                </DropdownMenuItem>
              )}
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
