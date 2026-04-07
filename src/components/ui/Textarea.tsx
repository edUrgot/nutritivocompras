import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm", props.className)} {...props} />;
}
