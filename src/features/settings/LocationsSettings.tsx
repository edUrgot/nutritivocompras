import type { PickupLocation } from "@shared/types/supplier";
import { SectionCard } from "@/components/ui/SectionCard";

export function LocationsSettings({ locations }: { locations: PickupLocation[] }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Direcciones de retiro</h3>
      <div className="mt-4 space-y-3">
        {locations.map((location) => (
          <div key={location.id} className="rounded-xl border border-slate-200 px-4 py-3">
            <p className="font-semibold text-slate-800">{location.supplierName}</p>
            <p className="text-sm text-slate-500">{location.addressLine}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
