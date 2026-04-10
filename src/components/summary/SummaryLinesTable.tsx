import type { PurchaseSummary } from "@shared/types/purchase";
import { formatCurrency } from "@/lib/currency";
import { formatNumber } from "@/lib/formatters";

export function SummaryLinesTable({ summary }: { summary: PurchaseSummary }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200">
      <div data-summary-lines-mobile className="space-y-3 bg-white p-3 md:hidden">
        {summary.lines.map((line) => (
          <div key={line.lineId} className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-3">
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold uppercase text-slate-700">{line.caliberName}</p>
              <p className="font-semibold text-slate-800">{formatCurrency(line.subtotal)}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <p>Cajas: {formatNumber(line.boxes)}</p>
              <p className="text-right">Und x Caja: {formatNumber(line.unitsPerBox)}</p>
              <p>Precio x Und: {formatCurrency(line.unitPrice)}</p>
              <p className="text-right">Total unidades: {formatNumber(line.totalUnits)}</p>
            </div>
          </div>
        ))}
        <div className="rounded-[18px] bg-[#f1c548] p-4 font-bold text-slate-800">
          <div className="flex items-center justify-between">
            <span>TOTAL</span>
            <span>{formatCurrency(summary.grandTotal)}</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <p>Cajas: {formatNumber(summary.totalBoxes)}</p>
            <p className="text-right">Precio x Und: {formatCurrency(summary.avgPricePerEgg)}</p>
            <p>Total unidades: {formatNumber(summary.totalUnits)}</p>
            <p className="text-right">Und x Caja: —</p>
          </div>
        </div>
      </div>

      <table data-summary-lines-desktop className="hidden min-w-full table-fixed md:table">
        <thead className="bg-brand-500 text-white">
          <tr>
            {["Tipo", "Cajas", "Und x Caja", "Precio x Und", "Total unidades", "Subtotal"].map((head) => (
              <th key={head} className="px-3 py-3 text-left text-sm font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {summary.lines.map((line) => (
            <tr key={line.lineId} className="odd:bg-slate-50/80">
              <td className="px-3 py-3 font-bold uppercase text-slate-700">{line.caliberName}</td>
              <td className="px-3 py-3 text-right text-slate-600">{formatNumber(line.boxes)}</td>
              <td className="px-3 py-3 text-right text-slate-600">{formatNumber(line.unitsPerBox)}</td>
              <td className="px-3 py-3 text-right text-slate-600">{formatCurrency(line.unitPrice)}</td>
              <td className="px-3 py-3 text-right text-slate-600">{formatNumber(line.totalUnits)}</td>
              <td className="px-3 py-3 text-right font-semibold text-slate-700">{formatCurrency(line.subtotal)}</td>
            </tr>
          ))}
          <tr className="bg-[#f1c548] font-bold text-slate-800">
            <td className="px-3 py-3 text-lg">TOTAL</td>
            <td className="px-3 py-3 text-right">{formatNumber(summary.totalBoxes)}</td>
            <td className="px-3 py-3 text-right">—</td>
            <td className="px-3 py-3 text-right">{formatCurrency(summary.avgPricePerEgg)}</td>
            <td className="px-3 py-3 text-right">{formatNumber(summary.totalUnits)}</td>
            <td className="px-3 py-3 text-right">{formatCurrency(summary.grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
