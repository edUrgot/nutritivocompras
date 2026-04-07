import type { PurchaseSummary } from "@shared/types/purchase";
import { PurchaseSummaryCard } from "@/components/summary/PurchaseSummaryCard";

export function PurchasePreviewDrawer({ summary }: { summary: PurchaseSummary | null }) {
  if (!summary) {
    return null;
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:p-6">
      <PurchaseSummaryCard summary={summary} />
    </div>
  );
}
