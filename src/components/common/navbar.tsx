"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isOnboarding = pathname?.startsWith('/onboarding');

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    // {href:"/prices",label:"Pricing"},
    { href: "/blog", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const path = usePathname()

  const noFooterPaths = [ROUTES.SIGNIN, ROUTES.SIGNUP] as string[]

  if (noFooterPaths.includes(path)) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto w-full container px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="flex items-center">
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
                    className="lg:hidden border-none shadow-none text-black "
                  >
                    <Image src="/menu.svg" alt="Menu" width={20} height={20} />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full bg-white">
                  <div className="flex items-center justify-between pt-6 px-6">
                    <Image
                      src="/NixerlyLogo.svg"
                      alt="Nixerly Logo"
                      width={53}
                      height={16}
                    />
                  </div>

                  {/* Navigation */}
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-xl font-normal transition-colors duration-200 px-6 ${isActive(link.href) ? "text-nixerly-blue" : "text-[#666666]"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="flex flex-col gap-2 mt-4">
                      <Separator/>
                      <div className="flex flex-col gap-2 justify-center items-center pt-6">
                      <Button asChild
                      variant="outline"
                      className="font-semibold w-fit rounded-full px-6 py-4">
                        <Link
                          href={ROUTES.SIGNIN}
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="font-semibold w-fit rounded-full px-6 py-4 bg-nixerly-blue text-white"
                      >
                        <Link
                          href={ROUTES.SIGNUP}
                          onClick={() => setIsOpen(false)}
                        >
                            Sign Up
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </nav>
                </SheetContent>

              </Sheet>
              <nav className="hidden lg:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium  transition-colors duration-200 ${isActive(link.href)
                        ? "text-nixerly-blue"
                        : "text-black"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  variant="light"
                  className="border rounded-full border-nixerly-gray w-28 h-10 hover:text-nixerly-blue font-semibold"
                  asChild
                >
                  <Link href={ROUTES.SIGNIN}>Sign In</Link>
                </Button>
                <Button
                  variant="secondary"
                  className="text-white rounded-full bg-nixerly-blue font-semibold w-28 h-10"
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
