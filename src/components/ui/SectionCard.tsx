import type { PropsWithChildren } from "react";

export function SectionCard({ children }: PropsWithChildren) {
  return <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-card md:p-6">{children}</section>;
}
