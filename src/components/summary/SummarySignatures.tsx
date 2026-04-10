import type { PurchaseSummary } from "@shared/types/purchase";

export function SummarySignatures({ summary }: { summary: PurchaseSummary }) {
  return (
    <div data-summary-signatures className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center text-slate-600">
        <p className="text-sm">Aprobado por</p>
        <p className="mt-2 text-base md:text-lg">{summary.header.authorizerName}</p>
      </div>
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center text-slate-600">
        <p className="text-sm">Proveedor / confirmación</p>
        <p className="mt-2 text-base md:text-lg">{summary.header.supplierName}</p>
      </div>
    </div>
  );
}
