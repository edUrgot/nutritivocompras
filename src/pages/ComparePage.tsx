import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { CompareTable } from "@/features/compare/CompareTable";
import { CheapestByCaliber } from "@/features/compare/CheapestByCaliber";
import { HistoryMiniChart } from "@/features/compare/HistoryMiniChart";
import { useCompareData } from "@/features/compare/hooks";

export function ComparePage() {
  const { data } = useCompareData();

  return (
    <div className="space-y-6">
      <PageHeader title="Comparativo de precios" description="Revisa últimos precios por proveedor, diferencias y el proveedor más barato por calibre." />
      {!data ? (
        <EmptyState title="Sin comparativo aún" description="Apenas existan datos guardados, aquí verás la matriz comparativa y tendencias." />
      ) : (
        <>
          <CheapestByCaliber data={data} />
          <CompareTable data={data} />
          <HistoryMiniChart data={data} />
        </>
      )}
    </div>
  );
}
