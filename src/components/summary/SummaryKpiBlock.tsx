import type { PurchaseSummary } from "@shared/types/purchase";
import { formatCurrency } from "@/lib/currency";
import { formatNumber } from "@/lib/formatters";

export function SummaryKpiBlock({ summary }: { summary: PurchaseSummary }) {
  return (
    <section data-summary-kpi-grid className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Calibres comprados</p>
        <p className="mt-2 text-2xl font-bold text-brand-900">{summary.purchasedCaliberCount}</p>
      </div>
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total cajas</p>
        <p className="mt-2 text-2xl font-bold text-brand-900">{formatNumber(summary.totalBoxes)}</p>
      </div>
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total unidades</p>
        <p className="mt-2 text-2xl font-bold text-brand-900">{formatNumber(summary.totalUnits)}</p>
      </div>
      <div className="rounded-[22px] border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Promedio por huevo</p>
        <p className="mt-2 text-2xl font-bold text-brand-900">{formatCurrency(summary.avgPricePerEgg)}</p>
      </div>
    </section>
  );
}
