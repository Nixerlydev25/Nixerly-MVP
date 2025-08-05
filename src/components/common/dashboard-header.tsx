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
import { UserCircle2Icon, LogOut } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { buttonTapAnimation, iconTapAnimation } from "@/hook/common/useAnimations";

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
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-white border-l border-t rounded-tl-2xl"
    >
      <div className="h-full flex items-center justify-end border-b">
        <div className="px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div {...buttonTapAnimation}>
                <Button
                  variant="light"
                  className="flex items-center gap-2 cursor-pointer border-none transition-colors duration-200 hover:bg-gray-50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
                  </motion.div>
                  <span className="text-sm font-medium ml-2">
                    {isBusinessProfile
                      ? user.businessProfile?.companyName
                      : `${user.firstName} ${user.lastName}`}
                  </span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <AnimatePresence>
              <DropdownMenuContent 
                className="w-52" 
                align="end"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <motion.div {...buttonTapAnimation}>
                    <DropdownMenuItem
                      onClick={handleProfileClick}
                      className="cursor-pointer flex items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <motion.div {...iconTapAnimation}>
                        <UserCircle2Icon className="mr-2 h-4 w-4" />
                      </motion.div>
                      Profile
                    </DropdownMenuItem>
                  </motion.div>
                  <DropdownMenuSeparator />
                  <motion.div {...buttonTapAnimation}>
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                    >
                      <motion.div {...iconTapAnimation}>
                        <LogOut className="mr-2 h-4 w-4" />
                      </motion.div>
                      Log out
                    </DropdownMenuItem>
                  </motion.div>
                </motion.div>
              </DropdownMenuContent>
            </AnimatePresence>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
} 