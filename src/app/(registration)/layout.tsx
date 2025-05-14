import type React from "react";
import Navbar from "@/components/common/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
