import type { DashboardPayload } from "@shared/types/dashboard";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";

export function CaliberShareChart({ data }: { data: DashboardPayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Participación por calibre</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.caliberShare}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4e82d7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
