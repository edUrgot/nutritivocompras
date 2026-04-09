import { useMemo, useState } from "react";
import type { ComparePayload } from "@shared/types/compare";
import { Button } from "@/components/ui/Button";
import { CurrencyField } from "@/components/ui/CurrencyField";
import { SectionCard } from "@/components/ui/SectionCard";
import { Select } from "@/components/ui/Select";
import { formatCurrency } from "@/lib/currency";
import { formatDateTime } from "@/lib/formatters";
import { useSaveLatestPrice } from "./hooks";

interface ManualPriceEditorProps {
  data: ComparePayload;
}

export function ManualPriceEditor({ data }: ManualPriceEditorProps) {
  const [supplierId, setSupplierId] = useState(data.suppliers[0]?.supplierId || "");
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});
  const saveMutation = useSaveLatestPrice();

  const supplier = useMemo(() => data.suppliers.find((item) => item.supplierId === supplierId), [data.suppliers, supplierId]);
  const rows = useMemo(() => data.matrix.filter((item) => item.supplierId === supplierId), [data.matrix, supplierId]);

  async function savePrice(caliberId: string, unitPrice: number) {
    if (!supplier || unitPrice <= 0) return;
    await saveMutation.mutateAsync({
      supplierId: supplier.supplierId,
      supplierName: supplier.supplierName,
      caliberId,
      unitPrice
    });
    setDraftValues((current) => ({ ...current, [caliberId]: "" }));
  }

  return (
    <SectionCard>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-brand-900">Actualizar precios manualmente</h3>
          <p className="mt-2 text-sm text-slate-500">Guarda el último precio por proveedor y calibre aunque todavía no exista una compra.</p>
        </div>
        <div className="w-full md:w-80">
          <label className="mb-2 block text-sm font-medium text-slate-700">Proveedor</label>
          <Select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
            {data.suppliers.map((item) => (
              <option key={item.supplierId} value={item.supplierId}>
                {item.supplierName}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {rows.map((row) => {
          const draftValue = draftValues[row.caliberId] ?? "";
          const parsedValue = Number(draftValue);
          const canSave = draftValue.trim() !== "" && Number.isFinite(parsedValue) && parsedValue > 0;

          return (
            <div key={`${row.supplierId}-${row.caliberId}`} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{row.caliberName}</p>
                  <p className="text-sm text-slate-500">
                    Actual: {row.unitPrice ? formatCurrency(row.unitPrice) : "-"} · Última actualización: {formatDateTime(row.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:w-[360px] md:flex-row">
                  <CurrencyField
                    value={draftValue}
                    onChange={(event) => setDraftValues((current) => ({ ...current, [row.caliberId]: event.target.value }))}
                    placeholder={row.unitPrice ? String(row.unitPrice) : "Nuevo precio"}
                    className="text-right font-semibold"
                  />
                  <Button disabled={!canSave || saveMutation.isPending} onClick={() => savePrice(row.caliberId, parsedValue)}>
                    Guardar precio
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
