"use client";

import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  icon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, icon, ...props }, ref) => {
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
                "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10",
                isFocused ? "text-or" : "text-gris-noble"
              )}
            >
              {icon}
            </div>
          )}
          <select
            ref={ref}
            className={cn(
              "w-full bg-transparent px-4 py-4 font-sans text-sm text-ivoire",
              "focus:outline-none appearance-none cursor-pointer",
              "transition-all duration-300",
              icon && "pl-12",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
            {...props}
          >
            <option value="" disabled className="bg-noir-elegant text-gris-noble">
              {label}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-noir-elegant text-ivoire"
              >
                {option.label}
              </option>
            ))}
          </select>
          <label
            className={cn(
              "absolute left-4 transition-all duration-300 pointer-events-none font-sans",
              icon && "left-12",
              isFocused || hasValue
                ? "-top-2.5 text-[0.65rem] tracking-wider uppercase bg-noir-elegant px-2"
                : "top-1/2 -translate-y-1/2 text-sm opacity-0",
              isFocused ? "text-or" : "text-gris-noble"
            )}
          >
            {label}
          </label>
          <ChevronDown
            size={18}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none",
              isFocused ? "text-or rotate-180" : "text-gris-noble"
            )}
          />
        </div>
        {error && (
          <p className="mt-2 font-sans text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };