import type { ComparePayload } from "@shared/types/compare";
import { SectionCard } from "@/components/ui/SectionCard";
import { formatCurrency } from "@/lib/currency";

export function CheapestByCaliber({ data }: { data: ComparePayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Proveedor más barato por calibre</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {data.cheapestByCaliber.map((item) => (
          <div key={item.caliberId} className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold text-slate-800">{item.caliberName}</p>
            <p className="mt-1 text-sm text-slate-500">{item.supplierName}</p>
            <p className="mt-2 text-lg font-bold text-brand-900">{formatCurrency(item.unitPrice)}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
