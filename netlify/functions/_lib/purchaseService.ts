import { purchasePayloadSchema } from "../../../shared/validation/purchase";
import type { PurchasePayload } from "../../../shared/types/purchase";
import type { SheetsRepository } from "./sheetsRepository";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function logPhase(phase: string, details: Record<string, unknown>) {
  console.log(`[savePurchaseFlow] ${phase}`, details);
}

export async function savePurchaseFlow(repository: SheetsRepository, rawBody: unknown) {
  logPhase("validate payload:start", {});
  const parsedPayload = purchasePayloadSchema.parse(rawBody);
  logPhase("validate payload:success", {
    supplierId: parsedPayload.header.supplierId,
    purchaseDate: parsedPayload.header.purchaseDate,
    lineCount: parsedPayload.lines.length
  });

  const payload: PurchasePayload = {
    header: {
      supplierId: parsedPayload.header.supplierId,
      supplierName: parsedPayload.header.supplierName,
      customSupplierName: parsedPayload.header.customSupplierName,
      documentNumber: parsedPayload.header.documentNumber,
      purchaseDate: parsedPayload.header.purchaseDate,
      responsibleName: parsedPayload.header.responsibleName,
      authorizerName: parsedPayload.header.authorizerName,
      deliveryMode: parsedPayload.header.deliveryMode,
      pickupLocationId: parsedPayload.header.pickupLocationId,
      pickupLocationLabel: parsedPayload.header.pickupLocationLabel,
      addressText: parsedPayload.header.addressText,
      paymentMethod: parsedPayload.header.paymentMethod,
      notes: parsedPayload.header.notes
    },
    lines: parsedPayload.lines.map((line) => ({
      lineId: line.lineId,
      caliberId: line.caliberId,
      caliberName: line.caliberName,
      category: line.category,
      unitPrice: line.unitPrice,
      boxes: line.boxes,
      unitsPerBox: line.unitsPerBox,
      totalUnits: line.totalUnits,
      subtotal: line.subtotal,
      parserConfidence: line.parserConfidence,
      parserRawLabel: line.parserRawLabel
    }))
  };

  let supplierId = payload.header.supplierId;
  let supplierName = payload.header.supplierName;
  logPhase("normalize supplier:start", { supplierId, supplierName });

  if (supplierId === "otro" && payload.header.customSupplierName) {
    supplierName = payload.header.customSupplierName;
    supplierId = slugify(payload.header.customSupplierName);
    logPhase("normalize supplier:upsert custom provider", { supplierId, supplierName });
    await repository.upsertProvider({
      id: supplierId,
      name: supplierName,
      supplierType: "custom",
      isPredefined: false,
      isActive: true
    });
  }

  logPhase("generate document number:start", {
    purchaseDate: payload.header.purchaseDate,
    currentDocumentNumber: payload.header.documentNumber
  });
  const documentNumber =
    payload.header.documentNumber.trim() || (await repository.getNextDocumentNumber(payload.header.purchaseDate)).documentNumber;
  logPhase("generate document number:success", { documentNumber });

  const purchaseId = `purchase-${Date.now()}`;
  try {
    logPhase("save header/start", { purchaseId, sheet: "purchase_headers" });
    const summary = await repository.savePurchase(
      {
        ...payload,
        header: {
          ...payload.header,
          supplierId,
          supplierName,
          documentNumber
        }
      },
      purchaseId
    );
    logPhase("save purchase:success", { purchaseId });

    return {
      purchaseId,
      savedAt: new Date().toISOString(),
      summary
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected save purchase error";
    logPhase("save purchase:error", { purchaseId, message });
    throw new Error(`savePurchaseFlow failed for ${purchaseId}: ${message}`);
  }
}
