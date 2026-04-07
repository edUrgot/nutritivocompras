import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { LatestPriceRecord, PurchaseHeaderDraft, PurchaseLineDraft } from "@shared/types/purchase";
import { queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { PurchasePreviewDrawer } from "@/features/purchases/components/PurchasePreviewDrawer";
import { FreePriceInput } from "@/features/purchases/components/FreePriceInput";
import { ParsedLinesEditor } from "@/features/purchases/components/ParsedLinesEditor";
import { PurchaseActions } from "@/features/purchases/components/PurchaseActions";
import {
  PurchaseDetailsForm,
  type PurchaseDetailsField
} from "@/features/purchases/components/PurchaseDetailsForm";
import { SupplierSelector } from "@/features/purchases/components/SupplierSelector";
import { buildSummary, calculateLine } from "@/features/purchases/calculations";
import { buildEmptyLines, defaultHeader } from "@/features/purchases/defaults";
import {
  useBootstrap,
  useLatestPrices,
  useNextDocumentNumber,
  useParsePrices,
  useSavePurchase
} from "@/features/purchases/hooks";
import { mergeParsedLines } from "@/features/purchases/mappers";
import { formatCurrency } from "@/lib/currency";
import { exportPurchaseAsExcel } from "@/lib/exportExcel";
import { exportNodeAsImage } from "@/lib/exportImage";
import { exportNodeAsPdf } from "@/lib/exportPdf";
import { buildExportFilename } from "@/lib/fileNames";
import { formatNumber } from "@/lib/formatters";

type HeaderField = keyof PurchaseHeaderDraft;
type EditableLineField = "unitPrice" | "boxes" | "unitsPerBox";
type ResetLocationState = { resetToken?: number } | null;

function createInitialHeader(): PurchaseHeaderDraft {
  return { ...defaultHeader };
}

export function NewPurchasePage() {
  const location = useLocation();
  const locationState = location.state as ResetLocationState;
  const { data: bootstrap } = useBootstrap();

  type BootstrapData = NonNullable<typeof bootstrap>;
  type SupplierItem = BootstrapData["suppliers"][number];
  type PickupLocationItem = BootstrapData["pickupLocations"][number];

  const [rawText, setRawText] = useState("");
  const [header, setHeader] = useState<PurchaseHeaderDraft>(createInitialHeader);
  const [lines, setLines] = useState<PurchaseLineDraft[]>(buildEmptyLines);
  const [saveError, setSaveError] = useState("");
  const [documentNumberDirty, setDocumentNumberDirty] = useState(false);
  const [lastResetToken, setLastResetToken] = useState<number | undefined>(locationState?.resetToken);
  const summaryRef = useRef<HTMLDivElement>(null);
  const parseMutation = useParsePrices();
  const saveMutation = useSavePurchase();
  const latestPrices = useLatestPrices(header.supplierId);
  const nextDocumentNumber = useNextDocumentNumber(header.purchaseDate);

  const supplierLocations = useMemo(
    () =>
      bootstrap?.pickupLocations.filter(
        (pickupLocation: PickupLocationItem) => pickupLocation.supplierId === header.supplierId
      ) ?? [],
    [bootstrap?.pickupLocations, header.supplierId]
  );

  const summary = useMemo(() => buildSummary(header, lines), [header, lines]);
  const canLoadLatest = Boolean(header.supplierId) && (latestPrices.data?.latestPrices?.length ?? 0) > 0;
  const canPreview = summary.lines.length > 0;

  function resetPurchaseForm() {
    setHeader(createInitialHeader());
    setRawText("");
    setLines(buildEmptyLines());
    setSaveError("");
    setDocumentNumberDirty(false);
    parseMutation.reset();
    saveMutation.reset();
    void queryClient.invalidateQueries({ queryKey: ["next-document-number"] });
  }

  useEffect(() => {
    if (locationState?.resetToken && locationState.resetToken !== lastResetToken) {
      resetPurchaseForm();
      setLastResetToken(locationState.resetToken);
    }
  }, [lastResetToken, locationState?.resetToken]);

  useEffect(() => {
    const suggestedDocumentNumber = nextDocumentNumber.data?.documentNumber;
    if (!suggestedDocumentNumber || documentNumberDirty) {
      return;
    }

    setHeader((current) => ({ ...current, documentNumber: suggestedDocumentNumber }));
  }, [documentNumberDirty, nextDocumentNumber.data?.documentNumber]);

  function updateHeader<K extends HeaderField>(field: K, value: PurchaseHeaderDraft[K]) {
    setHeader((current) => {
      const next: PurchaseHeaderDraft = { ...current };
      next[field] = value;

      if (field === "supplierId" && bootstrap) {
        const supplier = bootstrap.suppliers.find((item: SupplierItem) => item.id === value);
        next.supplierName = supplier?.name ?? "";
        next.customSupplierName = value === "otro" ? current.customSupplierName ?? "" : "";

        if (next.deliveryMode === "retiro") {
          const preferredLocation = bootstrap.pickupLocations.find(
            (pickupLocation: PickupLocationItem) => pickupLocation.supplierId === value
          );

          if (preferredLocation) {
            next.addressText = preferredLocation.addressLine;
            next.pickupLocationId = preferredLocation.id;
            next.pickupLocationLabel = preferredLocation.label;
          } else {
            next.addressText = "";
            next.pickupLocationId = "";
            next.pickupLocationLabel = "";
          }
        }
      }

      if (field === "deliveryMode") {
        if (value === "retiro" && bootstrap) {
          const preferredLocation = bootstrap.pickupLocations.find(
            (pickupLocation: PickupLocationItem) => pickupLocation.supplierId === current.supplierId
          );

          if (preferredLocation) {
            next.addressText = preferredLocation.addressLine;
            next.pickupLocationId = preferredLocation.id;
            next.pickupLocationLabel = preferredLocation.label;
          }
        }

        if (value === "despacho") {
          next.pickupLocationId = "";
          next.pickupLocationLabel = "";
        }
      }

      if (field === "customSupplierName") {
        next.supplierName = typeof value === "string" ? value : "";
      }

      return next;
    });
  }

  function updatePurchaseDetails(field: PurchaseDetailsField, value: string) {
    if (field === "deliveryMode") {
      updateHeader("deliveryMode", value === "despacho" ? "despacho" : "retiro");
      return;
    }

    if (field === "purchaseDate") {
      setDocumentNumberDirty(false);
      updateHeader("purchaseDate", value);
      return;
    }

    if (field === "documentNumber") {
      setDocumentNumberDirty(true);
      updateHeader("documentNumber", value);
      return;
    }

    updateHeader(field, value);
  }

  function updateLine(lineId: string, field: EditableLineField, value: number) {
    setLines((current) =>
      current.map((line) => (line.lineId === lineId ? calculateLine({ ...line, [field]: value }) : line))
    );
  }

  async function handleParse() {
    const result = await parseMutation.mutateAsync({
      rawText,
      supplierId: header.supplierId || undefined
    });

    setLines(mergeParsedLines(result.parsedLines));
  }

  function handleLoadLatest() {
    const latest = latestPrices.data?.latestPrices;
    if (!latest) return;

    setLines((current) =>
      current.map((line) => {
        const match = latest.find((item: LatestPriceRecord) => item.caliberId === line.caliberId);

        return match
          ? calculateLine({
              ...line,
              unitPrice: Number(match.unitPrice) || 0,
              unitsPerBox: Number(match.defaultUnitsPerBox) || line.unitsPerBox
            })
          : line;
      })
    );
  }

  async function handleSave() {
    if (header.supplierId === "otro" && !header.customSupplierName?.trim()) {
      setSaveError("Debes escribir un nombre real para el proveedor cuando eliges Otro.");
      return;
    }

    setSaveError("");

    await saveMutation.mutateAsync({
      header,
      lines: summary.lines
    });
  }

  async function handleExportPdf() {
    if (summaryRef.current) {
      await exportNodeAsPdf(summaryRef.current, buildExportFilename("resumen-compra", header.documentNumber));
    }
  }

  async function handleExportImage() {
    if (summaryRef.current) {
      await exportNodeAsImage(summaryRef.current, buildExportFilename("resumen-compra", header.documentNumber));
    }
  }

  async function handleExportExcel() {
    await exportPurchaseAsExcel(summary, buildExportFilename("resumen-compra", header.documentNumber));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nueva compra"
        description="Pega precios en formato libre, corrige la interpretación, edita cajas y unidades, genera el resumen y registra la compra en Google Sheets."
        aside={<Badge>Operación diaria</Badge>}
      />

      {!bootstrap ? (
        <EmptyState
          title="Cargando base operativa"
          description="Estamos cargando proveedores, calibres, aliases y configuración."
        />
      ) : (
        <>
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <SectionCard>
              <h2 className="text-xl font-bold text-brand-900">1. Proveedor y precios</h2>
              <div className="mt-4 space-y-5">
                <SupplierSelector
                  suppliers={bootstrap.suppliers}
                  supplierId={header.supplierId}
                  customSupplierName={header.customSupplierName ?? ""}
                  onSupplierChange={(value: string) => updateHeader("supplierId", value)}
                  onCustomNameChange={(value: string) => updateHeader("customSupplierName", value)}
                />
                <FreePriceInput
                  value={rawText}
                  onChange={setRawText}
                  onParse={handleParse}
                  onLoadLatest={handleLoadLatest}
                  parsing={parseMutation.isPending}
                  canLoadLatest={canLoadLatest}
                />
              </div>
            </SectionCard>

            <div className="grid gap-4">
              <StatCard label="Total cajas" value={formatNumber(summary.totalBoxes)} />
              <StatCard label="Total unidades" value={formatNumber(summary.totalUnits)} />
              <StatCard label="Promedio por huevo" value={formatCurrency(summary.avgPricePerEgg)} />
              <StatCard label="Total general" value={formatCurrency(summary.grandTotal)} />
            </div>
          </div>

          <SectionCard>
            <h2 className="text-xl font-bold text-brand-900">2. Tabla editable de compra</h2>
            <p className="mt-2 text-sm text-slate-500">
              Todo recalcula en tiempo real al editar precio, cajas o unidades por caja.
            </p>
            <div className="mt-4">
              <ParsedLinesEditor lines={lines} onLineChange={updateLine} />
            </div>
          </SectionCard>

          <SectionCard>
            <h2 className="text-xl font-bold text-brand-900">3. Datos comerciales</h2>
            <div className="mt-4">
              <PurchaseDetailsForm
                value={header}
                pickupLocations={supplierLocations}
                onChange={updatePurchaseDetails}
              />
            </div>
          </SectionCard>

          <SectionCard>
            <h2 className="text-xl font-bold text-brand-900">4. Acciones</h2>
            <div className="mt-4">
              <PurchaseActions
                onPreview={() => summaryRef.current?.scrollIntoView({ behavior: "smooth" })}
                onPdf={handleExportPdf}
                onImage={handleExportImage}
                onExcel={handleExportExcel}
                onSave={handleSave}
                saving={saveMutation.isPending}
                canPreview={canPreview}
              />
            </div>

            {saveError ? <p className="mt-4 text-sm font-medium text-rose-700">{saveError}</p> : null}

            {saveMutation.isError ? (
              <p className="mt-4 text-sm font-medium text-rose-700">
                {saveMutation.error instanceof Error ? saveMutation.error.message : "Error al guardar la compra."}
              </p>
            ) : null}

            {saveMutation.isSuccess ? (
              <p className="mt-4 text-sm font-medium text-emerald-700">Compra guardada correctamente.</p>
            ) : null}
          </SectionCard>

          <div ref={summaryRef}>
            <PurchasePreviewDrawer summary={summary.lines.length ? summary : null} />
          </div>
        </>
      )}
    </div>
  );
}