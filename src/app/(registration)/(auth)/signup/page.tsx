"use client";

import type React from "react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Building, HardHat, UserPlus } from "lucide-react";
import { useState } from "react";
import ProfessionalSignupForm from "@/app/(registration)/(auth)/_components/ProfessionalSignupForm";
import BusinessSignupForm from "@/app/(registration)/(auth)/_components/BusinessSignupForm";

export default function RegisterPage() {
  const [profileType, setProfileType] = useState<"professional" | "business">(
    "professional"
  );

  return (
    <div className="flex min-h-screen ">
      <section className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <Card className="shadow-nixerly-card hover-card-rise rounded-2xl">
            <CardHeader className="space-y-2 pb-6">
              {/* <div className="flex justify-center mb-2">
                <div className="bg-nixerly-blue p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>   */}
              <CardTitle className="text-center text-black font-inter text-4xl font-bold leading-[normal] mt-10">
                Sign Up
              </CardTitle>
              <CardDescription className="text-center text-nixerly-darkgray font-inter text-sm font-normal leading-5">
                Join Nixerly to connect in the construction industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5 w-[500px] mx-auto container">
                <div className="space-y-2">
                  <Label className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">
                    I am a:
                  </Label>
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
                        className="flex justify-center items-center text-center  rounded-md border-2 border-nixerly-lightblue bg-white  text-black py-3 border-gray-100 "
                      >
                        <Image src="/blackCheck.svg" alt="Professional"  width={16} height={16} className="text-black"/>
                        <span
                          className="font-inter text-base font-medium leading-5
"
                        >
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
                        className="flex justify-center items-center text-center  rounded-md border-2 text-white  bg-primary p-3 "
                      >
                   <Image src="/buildingWhite.svg" alt="Professional" width={16} height={16} className="text-white" />
                        <span
                          className="font-inter text-base font-medium leading-5
"
                        ></span>
                        <span
                          className="font-inter text-base font-medium leading-5
"
                        >
                          Business
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="flex items-center justify-center my-4">
                    <p className="h-[2px] bg-gray-200 w-full " />
                    <p className="px-2 text-gray-200">OR</p>
                    <p className="h-[2px] bg-gray-200 w-full" />
                  </div>
                  
                </div>

                {profileType === "professional" ? (
                  <ProfessionalSignupForm />
                ) : (
                  <BusinessSignupForm />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              {/* <Separator className="my-4 bg-nixerly-lightblue" /> */}
              <p className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors font-inter text-sm leading-5"
                  tabIndex={0}
                  aria-label="Sign in to your account"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
