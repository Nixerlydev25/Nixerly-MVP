"use client";

import { DashboardSidebar } from "@/components/common/dashboard-sidebar";
import { DashboardHeader } from "@/components/common/dashboard-header";
import { SidebarBackdrop } from "@/components/common/sidebar-backdrop";
import { useSidebarStore } from "@/store/sidebar.store";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, setOpen } = useSidebarStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen]);

  return (
    <div className="min-h-screen flex mt-0 lg:mt-3">
      <SidebarBackdrop />
      <DashboardSidebar />
      <div className="flex-1 transition-all duration-300 lg:ml-0">
        <DashboardHeader />
        <main className="bg-white border-l min-h-[calc(100vh-4rem)] px-2">{children}</main>
      </div>
    </div>
  );
}
