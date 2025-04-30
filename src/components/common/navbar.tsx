"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-nixerly-blue text-white backdrop-blur supports-[backdrop-filter]:bg-nixerly-blue/95">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden text-white"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-lg font-medium ${
                        isActive(link.href)
                          ? "border-b-2 border-nixerly-blue"
                          : "text-muted-foreground"
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
            <Link href="/" className="flex items-center ml-4">
              <span className="font-bold text-xl">Nixerly</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium text-white ${
                  isActive(link.href)
                    ? "border-b-2 border-white"
                    : "hover:border-b-2 hover:border-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-white hover:bg-primary-700"
              asChild
            >
              <Link href={ROUTES.SIGNIN}>Sign In</Link>
            </Button>
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link href={ROUTES.SIGNUP}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
