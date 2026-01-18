"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-out-expo disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-or text-noir hover:bg-or-clair hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-transparent text-ivoire border border-white/30 hover:border-or hover:text-or",
      ghost: "bg-transparent text-ivoire hover:text-or hover:bg-white/5",
      outline:
        "bg-transparent text-or border border-or hover:bg-or hover:text-noir",
    };

    const sizes = {
      sm: "text-[0.65rem] px-4 py-2",
      md: "text-[0.7rem] px-6 py-3",
      lg: "text-[0.75rem] px-8 py-4",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Chargement...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
