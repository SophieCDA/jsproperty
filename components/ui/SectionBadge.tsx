"use client";

import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  text: string;
  centered?: boolean;
  className?: string;
}

export function SectionBadge({
  text,
  centered = false,
  className,
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-4 mb-6",
        centered && "justify-center",
        className
      )}
    >
      <span className="w-8 h-px bg-or" />
      <span className="font-sans text-[0.65rem] font-medium tracking-[0.3em] uppercase text-or">
        {text}
      </span>
      {centered && <span className="w-8 h-px bg-or" />}
    </div>
  );
}
