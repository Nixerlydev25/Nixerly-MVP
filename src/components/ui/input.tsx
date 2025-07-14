import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, onChange, ...props }: React.ComponentProps<"input">) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Convert number input to text input
      const input = e.target;
      const value = input.value;
      
      // Allow empty string or valid numbers
      if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };

  return (
    <input
      type={type === "number" ? "text" : type}
      inputMode={type === "number" ? "numeric" : undefined}
      pattern={type === "number" ? "-?[0-9]*\.?[0-9]*" : undefined}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus:!border-blue-500 focus:!text-black focus:!ring-2 focus:!ring-blue-200",
        "focus-visible:!border-blue-500  focus-visible:!text-black focus-visible:!ring-2 focus-visible:!ring-blue-200",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      onChange={handleChange}
      {...props}
    />
  )
}

export { Input }
