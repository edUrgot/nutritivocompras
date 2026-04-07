import type { PurchaseSummary } from "@shared/types/purchase";
import { formatCurrency } from "@/lib/currency";
import { formatNumber } from "@/lib/formatters";

export function SummaryKpiBlock({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="space-y-2 text-[15px] leading-7 text-slate-600">
      <p>
        <span className="font-bold text-brand-900">Calibres comprados:</span> {summary.purchasedCaliberCount}
      </p>
      <p>
        <span className="font-bold text-brand-900">Total cajas:</span> {formatNumber(summary.totalBoxes)}
      </p>
      <p>
        <span className="font-bold text-brand-900">Total unidades:</span> {formatNumber(summary.totalUnits)}
      </p>
      <p>
        <span className="font-bold text-brand-900">Promedio por huevo:</span> {formatCurrency(summary.avgPricePerEgg)}
      </p>
    </div>
  );
}
