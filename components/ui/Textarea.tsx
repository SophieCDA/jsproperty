"use client";

import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
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
          <textarea
            ref={ref}
            className={cn(
              "w-full bg-transparent px-4 py-4 font-sans text-sm text-ivoire",
              "placeholder-transparent focus:outline-none resize-none",
              "transition-all duration-300 min-h-[160px]",
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
              isFocused || hasValue
                ? "-top-2.5 text-[0.65rem] tracking-wider uppercase bg-noir-elegant px-2"
                : "top-4 text-sm",
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

Textarea.displayName = "Textarea";

export { Textarea };