"use client";

import type React from "react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfessionalSignupForm from "@/app/(registration)/(auth)/_components/ProfessionalSignupForm";
import BusinessSignupForm from "@/app/(registration)/(auth)/_components/BusinessSignupForm";

export default function RegisterPage() {
  const [profileType, setProfileType] = useState<"professional" | "business">(
    "professional"
  );

  return (
    <div className="flex min-h-screen relative">
      <div className="absolute top-8 right-8 z-50">
        <Link href={'/'}>
        <Image
          src="/NixerlyLogo.svg"
          alt="Nixerly Logo"
          width={120}
          height={32}
          priority
          />
          </Link>
      </div>
      {/* Left side - Promotional Content */}
      <section className="hidden lg:flex flex-3 relative overflow-hidden m-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">

        <Image
          src="/signup.jpg"
          alt="Construction Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-nixerly-blue to-nixerly-blue/95" />
        <div className="relative z-10 flex items-center justify-center p-8">
          <div className="max-w-xl text-white">
            <h2 className="text-6xl font-bold mb-8  drop-shadow-lg [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]">
              Join Nixerly Today
            </h2>
            <p className="text-2xl mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_5px_rgb(0_0_0_/_30%)]">
              Connect with top construction professionals and businesses. Build
              your network and grow your career.
            </p>
          </div>
        </div>
      </section>

      {/* Right side - Sign Up Form */}
      <section className="flex flex-2 items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create Account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Join Nixerly to connect in the construction industry
              </p>
            </div>
            <div>
              <div className="space-y-5  max-w-[500px] mx-auto container">
                <div className="space-y-2">
                  {/* <Label className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">
                    You Name
                  </Label> */}
                  <RadioGroup
                    defaultValue={profileType}
                    onValueChange={(value) =>
                      setProfileType(value as "professional" | "business")
                    }
                    className="grid grid-cols-2 gap-4 "
                  >
                    <div>
                      <RadioGroupItem
                        value="professional"
                        id="professional"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="professional"
                        className={`flex justify-center items-center gap-2 text-center rounded-md border-2 py-3 transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
        ${
          profileType === "professional"
            ? "bg-nixerly-blue text-white shadow-lg"
            : "bg-white text-black border-gray-100 hover:border-nixerly-blue/30"
        }`}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Image
                            src={
                              profileType === "professional"
                                ? "/whitecheckHuman.svg"
                                : "/blackCheck.svg"
                            }
                            alt="Professional"
                            width={20}
                            height={20}
                            className="transition-transform duration-300"
                          />
                        </motion.div>
                        <span className="font-inter text-base font-medium leading-5">
                          Professional
                        </span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="business"
                        id="business"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="business"
                        className={`flex justify-center items-center gap-2 text-center rounded-md border-2 py-3 transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98]
        ${
          profileType === "business"
            ? "bg-nixerly-blue text-white shadow-lg"
            : "bg-white text-black border-gray-100 hover:border-nixerly-blue/30"
        }`}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Image
                            src={
                              profileType === "business"
                                ? "/buildingWhite.svg"
                                : "/buildingBlack.svg"
                            }
                            alt="Business"
                            width={20}
                            height={20}
                            className="transition-transform duration-300"
                          />
                        </motion.div>
                        <span className="font-inter text-base font-medium leading-5">
                          Business
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center justify-center my-4">
                    <p className="h-[2px] bg-gray-200 w-full " />
                    <p className="px-2 text-[#6F767E]">OR</p>
                    <p className="h-[2px] bg-gray-200 w-full" />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={profileType}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {profileType === "professional" ? (
                      <ProfessionalSignupForm />
                    ) : (
                      <BusinessSignupForm />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                  tabIndex={0}
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
