"use client"

import { Spinner } from "@/components/ui/spinner"

export default function RegistrationLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-64px)]">
      <Spinner size="lg" />
    </div>
  )
}