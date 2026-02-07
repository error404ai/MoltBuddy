import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary-hover": variant === "primary",
            "bg-secondary text-white hover:bg-secondary-hover": variant === "secondary",
            "border border-border bg-transparent text-text-primary hover:bg-surface-hover": variant === "outline",
            "bg-transparent text-text-primary hover:bg-surface-hover": variant === "ghost",
            "bg-danger text-white hover:bg-danger-hover": variant === "danger",
          },
          {
            "h-8 px-4 text-sm": size === "sm",
            "h-10 px-5 text-base": size === "md",
            "h-12 px-6 text-lg": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
