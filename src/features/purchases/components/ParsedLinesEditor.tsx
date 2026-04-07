import type { PurchaseLineDraft } from "@shared/types/purchase";
import { CurrencyField } from "@/components/ui/CurrencyField";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/currency";
import { formatNumber } from "@/lib/formatters";

interface ParsedLinesEditorProps {
  lines: PurchaseLineDraft[];
  onLineChange: (lineId: string, field: "unitPrice" | "boxes" | "unitsPerBox", value: number) => void;
}

export function ParsedLinesEditor({ lines, onLineChange }: ParsedLinesEditorProps) {
  return (
    <DataTable headers={["Calibre", "Precio unitario", "Cajas", "Unidades por caja", "Total unidades", "Subtotal"]}>
      {lines.map((line) => (
        <tr key={line.lineId} className="odd:bg-slate-50/70">
          <td className="px-4 py-3 font-semibold text-slate-700">{line.caliberName}</td>
          <td className="px-4 py-3">
            <CurrencyField value={line.unitPrice} onChange={(event) => onLineChange(line.lineId, "unitPrice", Number(event.target.value) || 0)} />
          </td>
          <td className="px-4 py-3">
            <Input type="number" min={0} value={line.boxes} onChange={(event) => onLineChange(line.lineId, "boxes", Number(event.target.value) || 0)} />
          </td>
          <td className="px-4 py-3">
            <Input
              type="number"
              min={0}
              value={line.unitsPerBox}
              onChange={(event) => onLineChange(line.lineId, "unitsPerBox", Number(event.target.value) || 0)}
            />
          </td>
          <td className="px-4 py-3 text-right text-slate-600">{formatNumber(line.totalUnits)}</td>
          <td className="px-4 py-3 text-right font-semibold text-slate-700">{formatCurrency(line.subtotal)}</td>
        </tr>
      ))}
    </DataTable>
  );
}
