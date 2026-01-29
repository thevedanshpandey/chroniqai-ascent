import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const luxuryButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-platinum-glow font-modern font-semibold tracking-wide glow-platinum",
        ghost:
          "text-foreground/80 hover:text-foreground hover:bg-secondary/50 font-modern",
        outline:
          "border border-primary/30 text-primary hover:border-primary hover:bg-primary/5 font-modern",
        platinum:
          "bg-gradient-to-r from-platinum to-silver-mist text-obsidian font-modern font-semibold tracking-wide hover:opacity-90 glow-platinum",
        link:
          "text-primary underline-offset-4 hover:underline font-modern",
      },
      size: {
        default: "h-12 px-8 py-3 rounded-lg",
        sm: "h-10 px-6 py-2 text-sm rounded-md",
        lg: "h-14 px-10 py-4 text-base rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof luxuryButtonVariants> {
  asChild?: boolean;
}

const LuxuryButton = React.forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(luxuryButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";

export { LuxuryButton, luxuryButtonVariants };
