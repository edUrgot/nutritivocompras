import type { DashboardPayload } from "@shared/types/dashboard";
import { StatCard } from "@/components/ui/StatCard";

export function KpiGrid({ data }: { data: DashboardPayload }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {data.kpis.map((kpi) => (
        <StatCard key={kpi.label} label={kpi.label} value={kpi.value} note={kpi.note} />
      ))}
    </div>
  );
}
