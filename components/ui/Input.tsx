"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, type = "text", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative">
        <div
          className={cn(
            "relative border transition-all duration-300",
            error
              ? "border-red-500/50"
              : isFocused
              ? "border-or"
              : "border-white/10 hover:border-white/20"
          )}
        >
          {icon && (
            <div
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                isFocused ? "text-or" : "text-gris-noble"
              )}
            >
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full bg-transparent px-4 py-4 font-sans text-sm text-ivoire",
              "placeholder-transparent focus:outline-none",
              "transition-all duration-300",
              icon && "pl-12",
              className
            )}
            placeholder={label}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            {...props}
          />
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none font-sans",
              icon && "left-12",
              isFocused || hasValue
                ? "-top-2.5 text-[0.65rem] tracking-wider uppercase bg-noir-elegant px-2"
                : "top-1/2 -translate-y-1/2 text-sm",
              isFocused ? "text-or" : "text-gris-noble"
            )}
          >
            {label}
          </label>
        </div>
        {error && (
          <p className="mt-2 font-sans text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };