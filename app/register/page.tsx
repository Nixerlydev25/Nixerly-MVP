"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Building, HardHat, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"professional" | "business">("professional")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    jobTitle: "",
    acceptTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleUserTypeChange = (value: "professional" | "business") => {
    setUserType(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      toast({
        title: "Terms and Conditions",
        description: "You must accept the terms and conditions to register.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you would call your registration API
      console.log("Registration data:", { ...formData, userType })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      })

      // Redirect to verification page
      router.push("/verify-email")
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-nixerly-light-gradient bg-pattern">
      <Navbar />

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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-nixerly-darkgray font-medium">I am a:</Label>
                  <RadioGroup
                    defaultValue={userType}
                    onValueChange={(value) => handleUserTypeChange(value as "professional" | "business")}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-nixerly-darkgray font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-nixerly-darkgray font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                    />
                  </div>
                </div>

                {userType === "business" && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-nixerly-darkgray font-medium">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Acme Construction Ltd"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={userType === "business"}
                      className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                    />
                  </div>
                )}

                {userType === "professional" && (
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-nixerly-darkgray font-medium">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Project Manager"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required={userType === "professional"}
                      className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-nixerly-darkgray font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-nixerly-darkgray font-medium">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-nixerly-darkgray font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    onCheckedChange={handleCheckboxChange}
                    className="border-nixerly-lightblue data-[state=checked]:bg-nixerly-blue data-[state=checked]:border-nixerly-blue"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none text-nixerly-darkgray"
                  >
                    I agree to the{" "}
                    <Link 
                      href="/terms" 
                      className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                      tabIndex={0}
                      aria-label="Terms of Service"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link 
                      href="/privacy" 
                      className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                      tabIndex={0}
                      aria-label="Privacy Policy"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-nixerly-gradient hover:opacity-90 text-white font-semibold py-2.5 rounded-md shadow-nixerly-button transition-all duration-200 ease-in-out transform hover:translate-y-[-1px]" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4 bg-nixerly-lightblue" />
              <p className="text-center text-sm text-nixerly-darkgray">
                Already have an account?{" "}
                <Link 
                  href="/login" 
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

      <Footer />
    </div>
  )
}
