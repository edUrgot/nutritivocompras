import type { DashboardPayload } from "@shared/types/dashboard";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";

export function SpendTrendChart({ data }: { data: DashboardPayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Evolución del gasto</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.spendTrend}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#16345d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
