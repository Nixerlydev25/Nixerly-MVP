import { DashboardSidebar } from "@/components/common/dashboard-sidebar";
import { DashboardHeader } from "@/components/common/dashboard-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="bg-white border-l">{children}</main>
      </div>
    </div>
  );
}
