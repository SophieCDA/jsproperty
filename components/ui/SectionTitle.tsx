"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "font-serif font-light text-ivoire leading-tight",
        Tag === "h1" && "text-4xl md:text-5xl lg:text-6xl",
        Tag === "h2" && "text-3xl md:text-4xl lg:text-5xl",
        Tag === "h3" && "text-2xl md:text-3xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Emphasis({ children }: { children: ReactNode }) {
  return <em className="italic text-or-clair">{children}</em>;
}
