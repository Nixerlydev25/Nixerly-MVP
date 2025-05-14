import DashboardNav from "@/components/common/dashboardNav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardNav />
      <div>{children}</div>
    </div>
  );
}
