import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "accent"
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "light", children, ...props }, ref) => {
    // Definisi formula Glassmorphism sesuai UI.md
    const variants = {
      light: "bg-white/30 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,3,61,0.12)] text-[#00033D]",
      dark: "bg-[#030812]/50 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,3,61,0.12)] text-white",
      accent: "bg-[#977DFF]/15 backdrop-blur-xl border border-[#977DFF]/30 shadow-[0_8px_32px_rgba(0,3,61,0.12)] text-[#00033D]",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200 ease-out",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export { GlassCard }