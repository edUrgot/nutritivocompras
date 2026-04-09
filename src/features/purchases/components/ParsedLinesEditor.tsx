import type { ReactNode } from "react";
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

function FieldBlock({
  label,
  children,
  emphasize = false
}: {
  label: string;
  children: ReactNode;
  emphasize?: boolean;
}) {
  return (
    <label className={`block space-y-2 ${emphasize ? "rounded-2xl border border-brand-200 bg-brand-50/40 p-3" : ""}`}>
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

export function ParsedLinesEditor({ lines, onLineChange }: ParsedLinesEditorProps) {
  return (
    <>
      <div className="space-y-4 md:hidden">
        {lines.map((line) => (
          <div key={line.lineId} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-brand-900">{line.caliberName}</h3>
                <p className="text-sm text-slate-500">{line.category === "color" ? "Categoría color" : "Categoría blanco"}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-right">
                <p className="text-xs uppercase tracking-wide text-slate-500">Subtotal</p>
                <p className="text-base font-bold text-slate-900">{formatCurrency(line.subtotal)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <FieldBlock label="Precio unitario">
                <CurrencyField
                  value={line.unitPrice}
                  onChange={(event) => onLineChange(line.lineId, "unitPrice", Number(event.target.value) || 0)}
                  className="text-right font-semibold"
                />
              </FieldBlock>

              <FieldBlock label="Cajas" emphasize>
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={line.boxes}
                  onChange={(event) => onLineChange(line.lineId, "boxes", Number(event.target.value) || 0)}
                  className="text-center text-lg font-bold"
                />
              </FieldBlock>

              <FieldBlock label="Unidades por caja">
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={line.unitsPerBox}
                  onChange={(event) => onLineChange(line.lineId, "unitsPerBox", Number(event.target.value) || 0)}
                  className="text-center font-semibold"
                />
              </FieldBlock>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Total unidades</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{formatNumber(line.totalUnits)}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 text-right">
                <p className="text-xs uppercase tracking-wide text-slate-500">Subtotal</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{formatCurrency(line.subtotal)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable headers={["Calibre", "Precio unitario", "Cajas", "Unidades por caja", "Total unidades", "Subtotal"]}>
          {lines.map((line) => (
            <tr key={line.lineId} className="odd:bg-slate-50/70">
              <td className="px-4 py-3 font-semibold text-slate-700">{line.caliberName}</td>
              <td className="px-4 py-3">
                <CurrencyField
                  value={line.unitPrice}
                  onChange={(event) => onLineChange(line.lineId, "unitPrice", Number(event.target.value) || 0)}
                  className="min-w-[120px] text-right font-semibold"
                />
              </td>
              <td className="px-4 py-3">
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={line.boxes}
                  onChange={(event) => onLineChange(line.lineId, "boxes", Number(event.target.value) || 0)}
                  className="min-w-[100px] text-center font-semibold"
                />
              </td>
              <td className="px-4 py-3">
                <Input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={line.unitsPerBox}
                  onChange={(event) => onLineChange(line.lineId, "unitsPerBox", Number(event.target.value) || 0)}
                  className="min-w-[120px] text-center font-semibold"
                />
              </td>
              <td className="px-4 py-3 text-right text-slate-600">{formatNumber(line.totalUnits)}</td>
              <td className="px-4 py-3 text-right font-semibold text-slate-700">{formatCurrency(line.subtotal)}</td>
            </tr>
          ))}
        </DataTable>
      </div>
    </>
  );
}
