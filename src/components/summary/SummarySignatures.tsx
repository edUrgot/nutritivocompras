import type { PurchaseSummary } from "@shared/types/purchase";

export function SummarySignatures({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="grid gap-8 pt-6 md:grid-cols-2">
      <div className="border-t border-slate-300 pt-4 text-center text-slate-600">
        <p className="text-sm">Aprobado por</p>
        <p className="mt-2 text-lg">{summary.header.authorizerName}</p>
      </div>
      <div className="border-t border-slate-300 pt-4 text-center text-slate-600">
        <p className="text-sm">Proveedor / confirmación</p>
        <p className="mt-2 text-lg">{summary.header.supplierName}</p>
      </div>
    </div>
  );
}
