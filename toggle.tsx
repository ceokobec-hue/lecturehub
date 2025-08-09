"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({ className, pressed, ...props }, ref) => (
  <button
    ref={ref}
    aria-pressed={pressed}
    className={cn(
      "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      pressed ? "bg-primary text-primary-foreground" : "bg-background",
      className
    )}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { Toggle };

