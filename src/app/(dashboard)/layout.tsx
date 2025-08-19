import { MobileSidebar, DesktopSidebar } from "@/components/common/dashboard-sidebar";
import { DashboardHeader } from "@/components/common/dashboard-header";
import { SidebarBackdrop } from "@/components/common/sidebar-backdrop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex mt-0 lg:mt-3">
      <SidebarBackdrop />
      <MobileSidebar />
      <DesktopSidebar />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <DashboardHeader />
        <main className="bg-white lg:border-l min-h-[calc(100vh-4rem)] px-2 lg:px-6">{children}</main>
      </div>
    </div>
  );
}