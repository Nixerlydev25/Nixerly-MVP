"use client"

import { useState } from "react"
import PhoneInput from "react-phone-number-input"
// import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import "react-phone-number-input/style.css"

interface PhoneInputComponentProps {
  placeholder?: string
  className?: string
  error?: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange?: (value: string | undefined) => void
}

export function PhoneInputComponent({
  placeholder = "Enter phone number",
  className,
  error,
  // required = false,
  disabled = false,
  value,
  onChange,
}: PhoneInputComponentProps) {
  const [phone, setPhone] = useState(value || "")

  const handleChange = (value: string | undefined) => {
    setPhone(value || "")
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={cn("grid w-full gap-1.5", className)}>
      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-within:ring-red-500",
        )}
      >
        <PhoneInput
          international
          defaultCountry="US"
          placeholder={placeholder}
          value={phone}
          onChange={handleChange}
          disabled={disabled}
          className="w-full border-none bg-transparent p-0 outline-none focus:ring-0 focus-visible:ring-0"
        />
      </div>
    </div>
  )
}
