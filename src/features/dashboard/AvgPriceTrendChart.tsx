import type { DashboardPayload } from "@shared/types/dashboard";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";

export function AvgPriceTrendChart({ data }: { data: DashboardPayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Tendencia precio por huevo</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.avgPriceTrend}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#ecb71e" fill="#f7df8d" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
