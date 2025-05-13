import type React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme.provider";
import "../globals.css";
import QueryProvider from "@/providers/query.provider";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nixerly | Connecting Construction Professionals with Businesses",
  description:
    "The digital platform connecting construction professionals with businesses in Ireland.",
  generator: "v0.dev",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </div>
            <Toaster/>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
