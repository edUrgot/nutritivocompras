import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ComparePayload } from "@shared/types/compare";
import { SectionCard } from "@/components/ui/SectionCard";

export function HistoryMiniChart({ data }: { data: ComparePayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Histórico reciente</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.historySeries}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4e82d7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
