"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isOnboarding = pathname?.startsWith('/onboarding');

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary bg-white">
      <div className="mx-auto w-full container sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center ml-4">
              <Image src="/NixerlyLogo.svg" alt="Nixerly Logo" width={126} height={42} className="mr-2" />
            </Link>
          </div>
          {!isOnboarding && (
            <>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden text-black"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white text-black px-6">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-lg font-medium transition-colors duration-200 ${
                          isActive(link.href)
                            ? "text-nixerly-blue"
                            : "text-black "
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="flex flex-col gap-2 mt-4">
                      <Button asChild>
                        <Link
                          href={ROUTES.SIGNIN}
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link
                          href={ROUTES.SIGNUP}
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
              <nav className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium  transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-nixerly-blue"
                        : "text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center gap-2">
                <Button
                variant="light"
                  className="border rounded-full border-nixerly-gray w-28 h-10 hover:text-nixerly-blue border-gray-300"
                  asChild
                >
                  <Link href={ROUTES.SIGNIN}>Sign In</Link>
                </Button>
                <Button
                  variant="secondary"
                  className="text-white rounded-full bg-nixerly-blue w-28 h-10"
                  asChild
                >
                  <Link href={ROUTES.SIGNUP}>Sign Up</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
