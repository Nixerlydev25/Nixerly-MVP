"use client"

import type React from "react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Building, HardHat, UserPlus } from "lucide-react"
import { useState } from "react"
import ProfessionalSignupForm from "@/app/(registration)/(auth)/_components/ProfessionalSignupForm"
import BusinessSignupForm from "@/app/(registration)/(auth)/_components/BusinessSignupForm"

export default function RegisterPage() {
  const [profileType, setProfileType] = useState<"professional" | "business">("professional")

  return (
    <div className="flex min-h-screen flex-col bg-nixerly-light-gradient bg-pattern">
      <section className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="shadow-nixerly-card border-nixerly-lightblue hover-card-rise">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex justify-center mb-2">
                <div className="bg-nixerly-blue p-3 rounded-full">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="nixerly-heading text-2xl font-bold text-center text-nixerly-darkblue">Create an Account</CardTitle>
              <CardDescription className="text-center text-nixerly-darkgray">
                Join Nixerly to connect in the construction industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-nixerly-darkgray font-medium">I am a:</Label>
                  <RadioGroup
                    defaultValue={profileType}
                    onValueChange={(value) => setProfileType(value as "professional" | "business")}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="professional" id="professional" className="peer sr-only" />
                      <Label
                        htmlFor="professional"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-nixerly-lightblue bg-white p-4 hover:bg-nixerly-ultralightblue hover:border-nixerly-blue transition-colors peer-data-[state=checked]:border-nixerly-blue peer-data-[state=checked]:bg-nixerly-ultralightblue [&:has([data-state=checked])]:border-nixerly-blue"
                      >
                        <HardHat className="mb-3 h-6 w-6 text-nixerly-blue" />
                        <span className="font-medium">Professional</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="business" id="business" className="peer sr-only" />
                      <Label
                        htmlFor="business"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-nixerly-lightblue bg-white p-4 hover:bg-nixerly-ultralightblue hover:border-nixerly-blue transition-colors peer-data-[state=checked]:border-nixerly-blue peer-data-[state=checked]:bg-nixerly-ultralightblue [&:has([data-state=checked])]:border-nixerly-blue"
                      >
                        <Building className="mb-3 h-6 w-6 text-nixerly-blue" />
                        <span className="font-medium">Business</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {profileType === "professional" ? (
                  <ProfessionalSignupForm />
                ) : (
                  <BusinessSignupForm />
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4 bg-nixerly-lightblue" />
              <p className="text-center text-sm text-nixerly-darkgray">
                Already have an account?{" "}
                <Link 
                  href="/signin" 
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
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
  )
}
