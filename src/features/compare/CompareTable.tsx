import type { CompareCell, ComparePayload } from "@shared/types/compare";
import { DataTable } from "@/components/ui/DataTable";
import { formatCurrency } from "@/lib/currency";
import { formatDateTime } from "@/lib/formatters";

function buildMissingCell(supplierId: string, supplierName: string, cell: ComparePayload["calibers"][number]): CompareCell {
  return {
    supplierId,
    supplierName,
    caliberId: cell.caliberId,
    caliberName: cell.caliberName,
    shortName: cell.shortName,
    category: cell.category,
    unitPrice: null,
    updatedAt: ""
  };
}

export function CompareTable({ data }: { data: ComparePayload }) {
  const matrixBySupplier = data.suppliers.map((supplier) => ({
    supplier,
    cells: data.calibers.map(
      (caliber) =>
        data.matrix.find((item) => item.supplierId === supplier.supplierId && item.caliberId === caliber.caliberId) ??
        buildMissingCell(supplier.supplierId, supplier.supplierName, caliber)
    )
  }));

  return (
    <>
      <div className="space-y-4 md:hidden">
        {matrixBySupplier.map(({ supplier, cells }) => (
          <div key={supplier.supplierId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-bold text-brand-900">{supplier.supplierName}</h3>
            <div className="mt-4 space-y-3">
              {cells.map((cell) => (
                <div key={`${supplier.supplierId}-${cell.caliberId}`} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-900">{cell.shortName || cell.caliberName}</p>
                    <p className="text-sm text-slate-500">{cell.caliberName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{cell.unitPrice ? formatCurrency(cell.unitPrice) : "-"}</p>
                    <p className="text-xs text-slate-500">{formatDateTime(cell.updatedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <DataTable headers={["Proveedor", ...data.calibers.map((caliber) => caliber.shortName)]}>
          {matrixBySupplier.map(({ supplier, cells }) => (
            <tr key={supplier.supplierId} className="odd:bg-slate-50/70">
              <td className="px-4 py-3 font-semibold text-slate-800">{supplier.supplierName}</td>
              {cells.map((cell) => (
                <td key={`${supplier.supplierId}-${cell.caliberId}`} className="px-4 py-3 align-top">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">{cell.unitPrice ? formatCurrency(cell.unitPrice) : "-"}</p>
                    <p className="text-xs text-slate-500">{formatDateTime(cell.updatedAt)}</p>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </DataTable>
      </div>
    </>
  );
}
