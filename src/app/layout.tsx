import type React from "react";
import { ThemeProvider } from "@/providers/theme.provider";
import "./globals.css";
import { inter, spaceGrotesk, poppins } from "@/font/font";
import QueryProvider from "@/providers/query.provider";
import Footer from "@/components/common/footer";
import { ToastProvider } from "@/providers/ToastProvider";
import { Modals } from "@/components/modals";

export const metadata = {
  title: "Nixerly | Connecting Construction Professionals with Businesses",
  description:
    "The digital platform connecting construction professionals with businesses in Ireland.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} ${poppins.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            <div className="flex min-h-screen flex-col bg-nixerly-form-gradient">
              <main>{children}</main>
              <Footer />
            </div>
            <ToastProvider />
            <Modals />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
