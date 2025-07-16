"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
// import { useState } from "react"
import { ROUTES } from "@/lib/routes"
import Image from "next/image";

interface JobAlreadyAppliedProps {
  jobId: string
  jobTitle: string
  applicationDate: string
  applicationStatus: "pending" | "reviewing" | "shortlisted" | "rejected"
  onWithdrawApplication?: () => Promise<void>
}

export default function JobAlreadyApplied({
  // jobId,
  jobTitle,
  // applicationDate,
  applicationStatus = "pending",
  // onWithdrawApplication,
}: JobAlreadyAppliedProps) {
  // const [isWithdrawing, setIsWithdrawing] = useState(false)

  const statusInfo = {
    pending: {
      icon: <Image src="/applied.svg" alt="applied" width={232} height={208} className="h-52 w-60" />, // replaced icon
      title: "Application Pending",
      description: "Your application is being processed.",
      color: "text-amber-500",
    },
    reviewing: {
      icon: <Image src="/applied.svg" alt="applied" width={232} height={208} className="h-52 w-60" />, // replaced icon
      title: "Under Review",
      description: "The employer is currently reviewing your application.",
      color: "text-blue-500",
    },
    shortlisted: {
      icon: <Image src="/applied.svg" alt="applied" width={232} height={208} className="h-52 w-60" />, // replaced icon
      title: "Shortlisted",
      description: "You have been shortlisted for this position.",
      color: "text-green-500",
    },
    rejected: {
      icon: <Image src="/applied.svg" alt="applied" width={232} height={208} className="h-52 w-60" />, // replaced icon
      title: "Application Not Selected",
      description: "Unfortunately, your application was not selected for this position.",
      color: "text-red-500",
    },
  }

  const currentStatus = statusInfo[applicationStatus]

  // const handleWithdraw = async () => {
  //   if (!onWithdrawApplication) return

  //   try {
  //     setIsWithdrawing(true)
  //     await onWithdrawApplication()
  //   } catch (error) {
  //     console.error("Failed to withdraw application:", error)
  //   } finally {
  //     setIsWithdrawing(false)
  //   }
  // }

  return (
    <>
    <Card className="w-full">
      <CardHeader className="flex">
      <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div className="ml-2">
        <CardTitle className="text-lg text-nixerly-blue mb-0.5">Application Status</CardTitle>
        <CardDescription>Applied</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center py-6 space-y-4">
          {currentStatus.icon}
          <h3 className={`text-xl font-semibold ${currentStatus.color}`}>{currentStatus.title}</h3>
          <p className="text-muted-foreground max-w-md">{currentStatus.description}</p>

          <div className="bg-muted py-3 rounded-full mt-6">
            <div className="flex justify-between px-5">
              <span className="text-sm font-medium ">Job Title:{""} </span>
              <span className="text-sm text-nixerly-blue ml-1">{jobTitle}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 border-t pt-6">
        <Button className="rounded-full py-2 px-5" variant="outline" asChild>
          <Link href={ROUTES.WORKER_FEED}>Apply More Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
     <Card className="mt-10 rounded-2xl">
     <CardContent className="p-6">
       <h2 className="text-lg font-semibold mb-4 text-nixerly-blue">What&apos;s Next?</h2>
       <ul className="space-y-2 text-sm">
         <li className="flex gap-2">
         <span className="text-primary">•</span>
           <span>The employer will review your application</span>
         </li>
         <li className="flex gap-2">
         <span className="text-primary">•</span>
           <span>
             You may be contacted for additional information
           </span>
         </li>
         <li className="flex gap-2">
         <span className="text-primary">•</span>
           <span>
             If selected, you&apos;ll be invited for an interview
           </span>
         </li>
         <li className="flex gap-2">
         <span className="text-nixerly-businesslabel">•</span>
           <span>
             Keep your profile updated to improve your chances
           </span>
         </li>
       </ul>
     </CardContent>
   </Card>
   </>
  )
}
