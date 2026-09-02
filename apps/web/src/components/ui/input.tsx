import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white/40 backdrop-blur-md px-3 py-2 text-sm text-[#00033D] transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-[#00033D]/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0033FF] focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-40",
          error ? "border-red-400/50 bg-red-50/30" : "border-[#EAEDFB]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }