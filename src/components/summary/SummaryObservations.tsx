import type { PurchaseSummary } from "@shared/types/purchase";

export function SummaryObservations({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-5">
      <h4 className="text-xl font-bold text-brand-900">Observaciones estructuradas</h4>
      <div className="mt-3 space-y-1 text-[15px] text-slate-600">
        <p>Despacho / retiro: {summary.header.deliveryMode}</p>
        <p>Forma de pago: {summary.header.paymentMethod}</p>
        <p>Retiro / entrega: {summary.header.addressText}</p>
        <p>Notas: {summary.header.notes || "Sin observaciones."}</p>
      </div>
    </div>
  );
}
