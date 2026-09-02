import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0033FF] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#977DFF]/20 backdrop-blur-sm border-[#977DFF]/30 text-[#00033D]",
        success:
          "bg-emerald-400/20 backdrop-blur-sm border-emerald-400/30 text-emerald-800",
        danger:
          "bg-red-400/20 backdrop-blur-sm border-red-400/30 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }