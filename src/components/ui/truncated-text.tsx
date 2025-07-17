"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TruncatedTextProps {
  text: string
  maxLength?: number
  className?: string
}

export function TruncatedText({ text, maxLength = 100, className }: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (text.length <= maxLength) {
    return <p className={className}>{text}</p>
  }

  const displayedText = isExpanded ? text : `${text.substring(0, maxLength)}...`

  return (
    <p className={className}>
      {displayedText}
      <Button
        variant="link"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-0 h-auto ml-1 text-blue-600 hover:no-underline focus-visible:ring-offset-0 focus-visible:ring-0"
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </p>
  )
}
