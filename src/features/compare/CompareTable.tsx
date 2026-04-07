import type { ComparePayload } from "@shared/types/compare";
import { DataTable } from "@/components/ui/DataTable";
import { formatCurrency } from "@/lib/currency";

export function CompareTable({ data }: { data: ComparePayload }) {
  return (
    <DataTable headers={["Proveedor", "Calibre", "Último precio", "Actualizado"]}>
      {data.matrix.map((item, index) => (
        <tr key={`${item.supplierId}-${item.caliberId}-${index}`} className="odd:bg-slate-50/70">
          <td className="px-4 py-3">{item.supplierName}</td>
          <td className="px-4 py-3">{item.caliberName}</td>
          <td className="px-4 py-3 text-right">{item.unitPrice ? formatCurrency(item.unitPrice) : "Sin dato"}</td>
          <td className="px-4 py-3">{item.updatedAt || "—"}</td>
        </tr>
      ))}
    </DataTable>
  );
}
