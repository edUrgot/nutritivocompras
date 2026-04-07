import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { AvgPriceTrendChart } from "@/features/dashboard/AvgPriceTrendChart";
import { CaliberShareChart } from "@/features/dashboard/CaliberShareChart";
import { DashboardFilters } from "@/features/dashboard/DashboardFilters";
import { KpiGrid } from "@/features/dashboard/KpiGrid";
import { SpendTrendChart } from "@/features/dashboard/SpendTrendChart";
import { SupplierShareChart } from "@/features/dashboard/SupplierShareChart";
import { useDashboardData } from "@/features/dashboard/hooks";

export function DashboardPage() {
  const { data } = useDashboardData();

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="KPIs, tendencia de precios y participación por proveedor y calibre, con lectura cómoda en móvil y escritorio." />
      <DashboardFilters />
      {!data ? (
        <EmptyState title="Sin dashboard aún" description="El dashboard cobrará vida a medida que registres compras en Google Sheets." />
      ) : (
        <>
          <KpiGrid data={data} />
          <div className="grid gap-6 xl:grid-cols-2">
            <SpendTrendChart data={data} />
            <AvgPriceTrendChart data={data} />
            <SupplierShareChart data={data} />
            <CaliberShareChart data={data} />
          </div>
        </>
      )}
    </div>
  );
}
