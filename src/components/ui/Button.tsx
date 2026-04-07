import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:ring-1 disabled:ring-slate-200 disabled:hover:bg-slate-200",
        "bg-brand-900 text-white hover:bg-brand-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
