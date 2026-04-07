import { Button } from "@/components/ui/Button";

interface PurchaseActionsProps {
  onPreview: () => void;
  onPdf: () => void;
  onImage: () => void;
  onExcel: () => void;
  onSave: () => void;
  saving?: boolean;
  canPreview?: boolean;
}

export function PurchaseActions({ onPreview, onPdf, onImage, onExcel, onSave, saving, canPreview }: PurchaseActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        type="button"
        className="bg-brand-100 text-brand-900 ring-1 ring-brand-300 hover:bg-brand-200 disabled:bg-slate-200 disabled:text-slate-500 disabled:ring-slate-200"
        onClick={onPreview}
        disabled={!canPreview}
      >
        Ver resumen
      </Button>
      <Button type="button" className="bg-brand-700 text-white hover:bg-brand-600" onClick={onPdf}>
        Descargar PDF
      </Button>
      <Button type="button" className="bg-brand-700 text-white hover:bg-brand-600" onClick={onImage}>
        Descargar imagen
      </Button>
      <Button type="button" className="bg-brand-700 text-white hover:bg-brand-600" onClick={onExcel}>
        Descargar Excel
      </Button>
      <Button type="button" className="bg-emerald-700 text-white hover:bg-emerald-600" onClick={onSave} disabled={saving}>
        {saving ? "Guardando..." : "Guardar compra"}
      </Button>
    </div>
  );
}
