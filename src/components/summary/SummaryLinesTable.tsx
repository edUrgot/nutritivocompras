import type { PurchaseSummary } from "@shared/types/purchase";
import { formatCurrency } from "@/lib/currency";
import { formatNumber } from "@/lib/formatters";

export function SummaryLinesTable({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200">
      <table className="min-w-full">
        <thead className="bg-brand-500 text-white">
          <tr>
            {["Tipo", "Cajas", "Und x Caja", "Precio x Und", "Total unidades", "Subtotal"].map((head) => (
              <th key={head} className="px-4 py-3 text-left text-sm font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {summary.lines.map((line) => (
            <tr key={line.lineId} className="odd:bg-slate-50/80">
              <td className="px-4 py-3 font-bold uppercase text-slate-700">{line.caliberName}</td>
              <td className="px-4 py-3 text-right text-slate-600">{formatNumber(line.boxes)}</td>
              <td className="px-4 py-3 text-right text-slate-600">{formatNumber(line.unitsPerBox)}</td>
              <td className="px-4 py-3 text-right text-slate-600">{formatCurrency(line.unitPrice)}</td>
              <td className="px-4 py-3 text-right text-slate-600">{formatNumber(line.totalUnits)}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-700">{formatCurrency(line.subtotal)}</td>
            </tr>
          ))}
          <tr className="bg-[#f1c548] font-bold text-slate-800">
            <td className="px-4 py-4 text-lg">TOTAL</td>
            <td className="px-4 py-4 text-right">{formatNumber(summary.totalBoxes)}</td>
            <td className="px-4 py-4 text-right">—</td>
            <td className="px-4 py-4 text-right">{formatCurrency(summary.avgPricePerEgg)}</td>
            <td className="px-4 py-4 text-right">{formatNumber(summary.totalUnits)}</td>
            <td className="px-4 py-4 text-right">{formatCurrency(summary.grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
