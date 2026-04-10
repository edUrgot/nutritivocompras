import { Fragment } from "react";
import type { ComparePayload } from "@shared/types/compare";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency } from "@/lib/currency";

const FIXED_CALIBER_ORDER = [
  { caliberId: "segunda-blanco", label: "2B", fullName: "Segunda Blanco", group: "Blancos" },
  { caliberId: "primera-blanco", label: "PB", fullName: "Primera Blanco", group: "Blancos" },
  { caliberId: "extra-blanco", label: "EB", fullName: "Extra Blanco", group: "Blancos" },
  { caliberId: "super-blanco", label: "SB", fullName: "Súper Blanco", group: "Blancos" },
  { caliberId: "jumbo-blanco", label: "JB", fullName: "Jumbo Blanco", group: "Blancos" },
  { caliberId: "segunda-color", label: "2C", fullName: "Segunda Color", group: "Color" },
  { caliberId: "primera-color", label: "PC", fullName: "Primera Color", group: "Color" },
  { caliberId: "extra-color", label: "EC", fullName: "Extra Color", group: "Color" },
  { caliberId: "super-color", label: "SC", fullName: "Súper Color", group: "Color" },
  { caliberId: "jumbo-color", label: "JC", fullName: "Jumbo Color", group: "Color" }
] as const;

export function CompareSupplierMatrix({ data }: { data: ComparePayload }) {
  const priceByKey = new Map(data.matrix.map((item) => [`${item.supplierId}-${item.caliberId}`, item.unitPrice] as const));

  return (
    <SectionCard>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-brand-900">Tabla comparativa por proveedor y calibre</h3>
        <p className="text-sm text-slate-500">Compara visualmente el último precio disponible por proveedor. Si no existe un precio guardado, se muestra “-”.</p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-[760px] border-collapse bg-white text-sm">
          <thead className="bg-brand-500 text-white">
            <tr>
              <th className="sticky left-0 z-10 min-w-[132px] border-r border-brand-400 bg-brand-500 px-4 py-3 text-left font-semibold">
                Calibre
              </th>
              {data.suppliers.map((supplier) => (
                <th key={supplier.supplierId} className="min-w-[120px] px-4 py-3 text-center font-semibold">
                  {supplier.supplierName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIXED_CALIBER_ORDER.map((caliber, index) => {
              const isFirstOfGroup = index === 0 || FIXED_CALIBER_ORDER[index - 1].group !== caliber.group;

              return (
                <Fragment key={caliber.caliberId}>
                  {isFirstOfGroup ? (
                    <tr key={`${caliber.group}-group`} className="bg-slate-100">
                      <td colSpan={data.suppliers.length + 1} className="px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                        {caliber.group}
                      </td>
                    </tr>
                  ) : null}
                  <tr key={caliber.caliberId} className="odd:bg-slate-50/60">
                    <td className="sticky left-0 border-r border-slate-200 bg-white px-4 py-3 align-top">
                      <div className="font-semibold text-slate-900">{caliber.label}</div>
                      <div className="text-xs text-slate-500">{caliber.fullName}</div>
                    </td>
                    {data.suppliers.map((supplier) => {
                      const price = priceByKey.get(`${supplier.supplierId}-${caliber.caliberId}`);
                      return (
                        <td key={`${supplier.supplierId}-${caliber.caliberId}`} className="px-4 py-3 text-center font-medium text-slate-800">
                          {typeof price === "number" && price > 0 ? formatCurrency(price) : "-"}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
