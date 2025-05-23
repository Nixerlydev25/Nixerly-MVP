"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ROUTES } from "@/lib/routes"

interface JobAlreadyAppliedProps {
  jobId: string
  jobTitle: string
  applicationDate: string
  applicationStatus: "pending" | "reviewing" | "shortlisted" | "rejected"
  onWithdrawApplication?: () => Promise<void>
}

export default function JobAlreadyApplied({
  jobId,
  jobTitle,
  applicationDate,
  applicationStatus = "pending",
  onWithdrawApplication,
}: JobAlreadyAppliedProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const statusInfo = {
    pending: {
      icon: <Clock className="h-12 w-12 text-amber-500" />,
      title: "Application Pending",
      description: "Your application is being processed.",
      color: "text-amber-500",
    },
    reviewing: {
      icon: <Clock className="h-12 w-12 text-blue-500" />,
      title: "Under Review",
      description: "The employer is currently reviewing your application.",
      color: "text-blue-500",
    },
    shortlisted: {
      icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
      title: "Shortlisted",
      description: "You have been shortlisted for this position.",
      color: "text-green-500",
    },
    rejected: {
      icon: <AlertCircle className="h-12 w-12 text-red-500" />,
      title: "Application Not Selected",
      description: "Unfortunately, your application was not selected for this position.",
      color: "text-red-500",
    },
  }

  const currentStatus = statusInfo[applicationStatus]

  const handleWithdraw = async () => {
    if (!onWithdrawApplication) return

    try {
      setIsWithdrawing(true)
      await onWithdrawApplication()
    } catch (error) {
      console.error("Failed to withdraw application:", error)
    } finally {
      setIsWithdrawing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center py-6 space-y-4">
          {currentStatus.icon}
          <h3 className={`text-xl font-semibold ${currentStatus.color}`}>{currentStatus.title}</h3>
          <p className="text-muted-foreground max-w-md">{currentStatus.description}</p>

          <div className="bg-muted p-4 rounded-lg w-full max-w-md mt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Job Title:</span>
              <span className="text-sm">{jobTitle}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 border-t pt-6">
        <Button variant="outline" asChild>
          <Link href={ROUTES.WORKER_FEED}>Browse More Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
