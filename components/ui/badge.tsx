import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const styles: Record<string, string> = {
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  neutral: "bg-slate-100 text-slate-700",
  info: "bg-blue-100 text-blue-700"
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof styles }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[tone],
        className
      )}
      {...props}
    />
  );
}
