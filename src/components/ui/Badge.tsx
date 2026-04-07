import type { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900">{children}</span>;
}
