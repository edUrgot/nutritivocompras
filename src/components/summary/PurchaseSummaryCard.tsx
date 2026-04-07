import { logoNutritivoPath } from "@/assets/logoNutritivo";
import type { PurchaseSummary } from "@shared/types/purchase";
import { SummaryKpiBlock } from "./SummaryKpiBlock";
import { SummaryLinesTable } from "./SummaryLinesTable";
import { SummaryMetaBlock } from "./SummaryMetaBlock";
import { SummaryObservations } from "./SummaryObservations";
import { SummarySignatures } from "./SummarySignatures";

export function PurchaseSummaryCard({ summary }: { summary: PurchaseSummary }) {
  return (
    <article className="mx-auto w-full max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-card md:p-10">
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-start gap-4">
          <img src={logoNutritivoPath} alt="Nutritivo Chile" className="h-12 w-12" />
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-brand-900">Compras Nutritivo Chile</h2>
            <p className="mt-1 text-2xl text-slate-500">Resumen comercial</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <SummaryMetaBlock summary={summary} />
        <SummaryKpiBlock summary={summary} />
      </div>
      <div className="mt-8">
        <SummaryLinesTable summary={summary} />
      </div>
      <div className="mt-6">
        <SummaryObservations summary={summary} />
      </div>
      <SummarySignatures summary={summary} />
    </article>
  );
}
