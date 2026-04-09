import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { CompareTable } from "@/features/compare/CompareTable";
import { CheapestByCaliber } from "@/features/compare/CheapestByCaliber";
import { HistoryMiniChart } from "@/features/compare/HistoryMiniChart";
import { ManualPriceEditor } from "@/features/compare/ManualPriceEditor";
import { useCompareData } from "@/features/compare/hooks";

export function ComparePage() {
  const { data } = useCompareData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Comparativo de precios"
        description="Compara el último precio por proveedor y calibre, registra precios manuales y revisa la fecha de actualización."
      />
      {!data ? (
        <EmptyState title="Sin comparativo todavía" description="Apenas existan datos guardados, aquí verás la matriz comparativa y las tendencias." />
      ) : (
        <>
          <ManualPriceEditor data={data} />
          <CheapestByCaliber data={data} />
          <CompareTable data={data} />
          <HistoryMiniChart data={data} />
        </>
      )}
    </div>
  );
}
