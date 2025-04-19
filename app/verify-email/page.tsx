"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CheckCircle, Mail } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Check for verification token in URL (in a real app)
  useEffect(() => {
    // Simulate verification check
    const token = new URLSearchParams(window.location.search).get("token")
    if (token) {
      setIsVerified(true)
    }
  }, [])

  const handleResendEmail = async () => {
    setIsResending(true)

    try {
      // In a real implementation, you would call your API to resend the verification email
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox for the verification link.",
      })

      // Set a cooldown for resending
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error resending verification email:", error)
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleContinue = () => {
    // In a real app, this would redirect to the appropriate dashboard based on user type
    router.push("/dashboard/professional")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="flex flex-1 items-center justify-center py-12">
        <div className="container max-w-md px-4 md:px-6">
          <Card>
            <CardHeader className="space-y-1">
              {isVerified ? (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Email Verified</CardTitle>
                  <CardDescription className="text-center">
                    Your email has been successfully verified. You can now access your account.
                  </CardDescription>
                </>
              ) : (
                <>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <Mail className="h-10 w-10 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
                  <CardDescription className="text-center">
                    We've sent a verification link to your email address. Please check your inbox and click the link to
                    verify your account.
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              {isVerified ? (
                <Button onClick={handleContinue} className="w-full">
                  Continue to Dashboard
                </Button>
              ) : (
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full"
                  disabled={isResending || countdown > 0}
                >
                  {countdown > 0
                    ? `Resend Email (${countdown}s)`
                    : isResending
                      ? "Sending..."
                      : "Resend Verification Email"}
                </Button>
              )}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4" />
              <p className="text-center text-sm text-muted-foreground">
                Return to{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign In
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
