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
          "font-inter text-sm font-normal leading-5 tracking-tight text-black rounded-md border border-nixerly-bussinessborder p-3 focus-within:border-black focus-within:border-3 ",
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
