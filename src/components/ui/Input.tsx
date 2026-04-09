import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-ink shadow-sm md:text-sm", props.className)}
      {...props}
    />
  );
}
