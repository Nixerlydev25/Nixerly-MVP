"use client"

import { Spinner } from "@/components/ui/spinner"

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)]">
      <Spinner size="lg" />
    </div>
  )
}