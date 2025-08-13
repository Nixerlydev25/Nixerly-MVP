"use client";

import { useLogout } from "@/hook/auth/auth.hook";
import { useUser } from "@/hook/user/useUser";
import { ROUTES } from "@/lib/routes";
import { ProfileType } from "@/types/user/user.types";
import { useSidebarStore } from "@/store/sidebar.store";
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
import { UserCircle2Icon, LogOut, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonTapAnimation, iconTapAnimation } from "@/hook/common/useAnimations";

export function DashboardHeader() {
  const { mutate: logout } = useLogout();
  const { user, isLoading } = useUser();
  const router = useRouter();
  const { toggle: toggleSidebar, isOpen } = useSidebarStore();

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
      className="h-16 bg-white lg:border-l lg:border-t lg:rounded-tl-2xl"
    >
      <div className="h-full flex items-center justify-between lg:justify-end border-b">
        <motion.div 
          {...buttonTapAnimation}
          onClick={toggleSidebar}
          className="cursor-pointer"
        >
          {isOpen ? (
            <Image src="/cross.svg" alt="cross" width={20} height={20} className="ml-6 block lg:hidden h-5 w-5 text-gray-600" />
          ) : (
            <Image src="/menu.svg" alt="menu" width={20} height={20} className="ml-3 block lg:hidden h-5 w-5" />
          )}
        </motion.div>
        <div className="">
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
                  <span className="text-xs lg:text-sm font-normal ml-1">
                    {isBusinessProfile
                      ? user.businessProfile?.companyName
                      : `${user.firstName} ${user.lastName}`}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
                  </motion.div>
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