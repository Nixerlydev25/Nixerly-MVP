import { DashboardSidebar } from "@/components/common/dashboard-sidebar";
import { DashboardHeader } from "@/components/common/dashboard-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
}
