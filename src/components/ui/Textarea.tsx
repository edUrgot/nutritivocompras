import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn("w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-ink shadow-sm md:text-sm", props.className)}
      {...props}
    />
  );
}
