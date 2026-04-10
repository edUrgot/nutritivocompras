import { logoNutritivoPath } from "@/assets/logoNutritivo";
import type { PurchaseSummary } from "@shared/types/purchase";
import { SummaryKpiBlock } from "./SummaryKpiBlock";
import { SummaryLinesTable } from "./SummaryLinesTable";
import { SummaryMetaBlock } from "./SummaryMetaBlock";
import { SummaryObservations } from "./SummaryObservations";
import { SummarySignatures } from "./SummarySignatures";

export function PurchaseSummaryCard({ summary }: { summary: PurchaseSummary }) {
  return (
    <article className="mx-auto w-full max-w-[960px] rounded-[28px] border border-slate-200 bg-white p-4 shadow-card md:p-8">
      <header className="border-b border-slate-200 pb-5">
        <div className="flex items-start gap-3 md:gap-4">
          <img src={logoNutritivoPath} alt="Nutritivo Chile" className="h-11 w-11 md:h-12 md:w-12" />
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-brand-900 md:text-[2.35rem]">Compras Nutritivo Chile</h2>
            <p className="mt-1 text-lg text-slate-500 md:text-[1.75rem]">Resumen comercial</p>
          </div>
        </div>
      </header>

      <div data-summary-top-grid className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <SummaryMetaBlock summary={summary} />
        <SummaryKpiBlock summary={summary} />
      </div>

      <div className="mt-5">
        <SummaryLinesTable summary={summary} />
      </div>

      <div data-summary-bottom-grid className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <SummaryObservations summary={summary} />
        <SummarySignatures summary={summary} />
      </div>
    </article>
  );
}
