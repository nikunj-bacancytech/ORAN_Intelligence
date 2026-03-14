import Link, { type LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

export function ButtonLink({ children, className, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition hover:opacity-95",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
