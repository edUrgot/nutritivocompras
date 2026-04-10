import type { PurchaseSummary } from "@shared/types/purchase";

export function SummaryMetaBlock({ summary }: { summary: PurchaseSummary }) {
  return (
    <section className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4 md:p-5">
      <div data-summary-meta-grid className="grid gap-3 sm:grid-cols-2">
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-bold text-brand-900">Proveedor:</span> {summary.header.supplierName}
        </p>
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-bold text-brand-900">N° documento:</span> {summary.header.documentNumber}
        </p>
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-bold text-brand-900">Fecha:</span> {summary.header.purchaseDate}
        </p>
        <p className="text-sm leading-6 text-slate-600">
          <span className="font-bold text-brand-900">Responsable:</span> {summary.header.responsibleName}
        </p>
        <p className="text-sm leading-6 text-slate-600 sm:col-span-2">
          <span className="font-bold text-brand-900">Quién autoriza:</span> {summary.header.authorizerName}
        </p>
      </div>
    </section>
  );
}
