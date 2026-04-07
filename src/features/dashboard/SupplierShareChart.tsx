import type { DashboardPayload } from "@shared/types/dashboard";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { SectionCard } from "@/components/ui/SectionCard";

const colors = ["#16345d", "#4e82d7", "#8eb0e7", "#c5d6f3", "#ecb71e"];

export function SupplierShareChart({ data }: { data: DashboardPayload }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Participación por proveedor</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data.supplierShare} dataKey="value" nameKey="label" outerRadius={100}>
              {data.supplierShare.map((entry, index) => (
                <Cell key={entry.label} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}
