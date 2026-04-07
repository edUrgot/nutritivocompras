import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

interface FreePriceInputProps {
  value: string;
  onChange: (value: string) => void;
  onParse: () => void;
  onLoadLatest: () => void;
  parsing?: boolean;
  canLoadLatest?: boolean;
}

export function FreePriceInput({ value, onChange, onParse, onLoadLatest, parsing, canLoadLatest }: FreePriceInputProps) {
  return (
    <div className="space-y-3">
      <Textarea
        rows={7}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pega precios libres: Sb260 exb242 lb222 llb190 sc265..."
      />
      <p className="text-sm text-slate-500">
        Soporta aliases, texto corrido, líneas separadas, valores faltantes y palabras como Segunda, Primera, Extra, Súper o Jumbo.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={onParse} disabled={parsing}>
          {parsing ? "Interpretando..." : "Interpretar"}
        </Button>
        <Button
          type="button"
          className="bg-slate-900 text-white ring-1 ring-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-500 disabled:ring-slate-200"
          onClick={onLoadLatest}
          disabled={!canLoadLatest}
        >
          Cargar últimos precios
        </Button>
      </div>
    </div>
  );
}
