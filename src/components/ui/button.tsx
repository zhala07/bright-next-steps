import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-bounce active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-xl text-base min-h-[48px] px-6 shadow-[var(--shadow-button)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl text-base min-h-[48px] px-6",
        outline:
          "border-2 border-primary text-primary bg-card hover:bg-primary hover:text-primary-foreground rounded-xl text-base min-h-[48px] px-6 shadow-[var(--shadow-button)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl text-base min-h-[48px] px-6",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl text-base min-h-[48px] px-6",
        link: "text-primary underline-offset-4 hover:underline text-base",
        chip: "bg-card text-foreground border border-border hover:bg-accent rounded-full px-4 py-2 text-sm min-h-[40px]",
        "chip-selected": "bg-primary text-primary-foreground border border-primary rounded-full px-4 py-2 text-sm min-h-[40px]",
      },
      size: {
        default: "min-h-[48px] px-6",
        sm: "min-h-[40px] px-4 text-sm",
        lg: "min-h-[56px] px-8 text-lg",
        icon: "min-h-[48px] min-w-[48px]",
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
