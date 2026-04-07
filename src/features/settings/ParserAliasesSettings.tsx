import { PARSER_ALIASES } from "@/features/parser/aliases";
import { SectionCard } from "@/components/ui/SectionCard";

export function ParserAliasesSettings() {
  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Aliases del parser</h3>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {PARSER_ALIASES.slice(0, 16).map((alias) => (
          <div key={`${alias.alias}-${alias.caliberId}`} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
            <span className="font-semibold">{alias.alias}</span> {"->"} {alias.caliberId}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
