import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0033FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-[#0033FF] text-white shadow-[0_4px_20px_rgba(0,51,255,0.35)] hover:scale-[1.02] hover:shadow-[0_6px_24px_rgba(0,51,255,0.45)]",
        secondary:
          "bg-white/20 backdrop-blur-md border border-white/30 text-[#00033D] hover:bg-white/30 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,3,61,0.05)]",
        ghost: "hover:bg-white/20 hover:text-[#00033D] rounded-xl text-[#00033D]/80",
        danger:
          "bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)] hover:scale-[1.02]",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11 rounded-full", // Untuk icon button
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }