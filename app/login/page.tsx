"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { LogIn } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, you would call your authentication API
      console.log("Login attempt:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just redirect to a dashboard based on a simple check
      // In a real app, this would be determined by the user's role from the authentication response
      if (formData.email.includes("business")) {
        router.push("/dashboard/business")
      } else if (formData.email.includes("admin")) {
        router.push("/dashboard/admin")
      } else if (formData.email.includes("professional")) {
        router.push("/dashboard/professional")
      } else {
        router.push("/") // Redirect to home page by default
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
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
                  <LogIn className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="nixerly-heading text-2xl font-bold text-center text-nixerly-darkblue">Welcome back</CardTitle>
              <CardDescription className="text-center text-nixerly-darkgray">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-nixerly-darkgray font-medium">Password</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-sm text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                      tabIndex={0}
                      aria-label="Forgot password"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                <Button 
                  type="submit" 
                  className="w-full bg-nixerly-gradient hover:opacity-90 text-white font-semibold py-2.5 rounded-md shadow-nixerly-button transition-all duration-200 ease-in-out transform hover:translate-y-[-1px]" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4 bg-nixerly-lightblue" />
              <p className="text-center text-sm text-nixerly-darkgray">
                Don't have an account?{" "}
                <Link 
                  href="/register" 
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                  tabIndex={0}
                  aria-label="Sign up for an account"
                >
                  Sign up
                </Link>
              </p>
              <p className="mt-2 text-center text-xs text-nixerly-darkgray">
                By signing in, you agree to our{" "}
                <Link 
                  href="/terms" 
                  className="underline hover:text-nixerly-blue transition-colors"
                  tabIndex={0}
                  aria-label="Terms of Service"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link 
                  href="/privacy" 
                  className="underline hover:text-nixerly-blue transition-colors"
                  tabIndex={0}
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
