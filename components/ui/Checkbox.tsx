"use client";

import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="relative">
        <label className="flex items-start gap-4 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              className={cn(
                "peer sr-only",
                className
              )}
              {...props}
            />
            <div
              className={cn(
                "w-5 h-5 border transition-all duration-300 flex items-center justify-center",
                "peer-checked:bg-or peer-checked:border-or",
                error
                  ? "border-red-500/50"
                  : "border-white/20 group-hover:border-white/40"
              )}
            >
              <Check
                size={12}
                className="text-noir opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
              />
            </div>
          </div>
          <span className="font-sans text-sm font-light text-gris-clair leading-relaxed">
            {label}
          </span>
        </label>
        {error && (
          <p className="mt-2 ml-9 font-sans text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };