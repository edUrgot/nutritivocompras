import type { PurchaseLineDraft, PurchaseSummary } from "@shared/types/purchase";

export function calculateLine(line: PurchaseLineDraft): PurchaseLineDraft {
  const totalUnits = Number(line.boxes) * Number(line.unitsPerBox);
  const subtotal = totalUnits * Number(line.unitPrice);
  return {
    ...line,
    totalUnits,
    subtotal
  };
}

export function buildSummary(header: PurchaseSummary["header"], lines: PurchaseLineDraft[]): PurchaseSummary {
  const normalizedLines = lines.filter((line) => line.boxes > 0 && line.unitPrice > 0).map(calculateLine);
  const totalBoxes = normalizedLines.reduce((sum, line) => sum + Number(line.boxes), 0);
  const totalUnits = normalizedLines.reduce((sum, line) => sum + Number(line.totalUnits), 0);
  const grandTotal = normalizedLines.reduce((sum, line) => sum + Number(line.subtotal), 0);
  return {
    purchaseId: `preview-${header.documentNumber || "draft"}`,
    createdAt: new Date().toISOString(),
    header,
    lines: normalizedLines,
    totalBoxes,
    totalUnits,
    avgPricePerEgg: totalUnits ? grandTotal / totalUnits : 0,
    grandTotal,
    purchasedCaliberCount: normalizedLines.length
  };
}
