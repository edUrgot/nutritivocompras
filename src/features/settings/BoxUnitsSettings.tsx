import { CALIBERS } from "@shared/constants/calibers";
import { SectionCard } from "@/components/ui/SectionCard";

export function BoxUnitsSettings() {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Unidades por caja</h3>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {CALIBERS.map((caliber) => (
          <div key={caliber.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm">
            <span>{caliber.name}</span>
            <span className="font-semibold text-brand-900">{caliber.defaultUnitsPerBox}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
