import type { PurchaseSummary } from "@shared/types/purchase";

export function SummaryMetaBlock({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="space-y-2 text-[15px] leading-7 text-slate-600">
      <p>
        <span className="font-bold text-brand-900">Proveedor:</span> {summary.header.supplierName}
      </p>
      <p>
        <span className="font-bold text-brand-900">N° documento:</span> {summary.header.documentNumber}
      </p>
      <p>
        <span className="font-bold text-brand-900">Fecha:</span> {summary.header.purchaseDate}
      </p>
      <p>
        <span className="font-bold text-brand-900">Responsable:</span> {summary.header.responsibleName}
      </p>
      <p>
        <span className="font-bold text-brand-900">Quién autoriza:</span> {summary.header.authorizerName}
      </p>
    </div>
  );
}
