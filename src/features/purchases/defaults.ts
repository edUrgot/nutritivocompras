import { CALIBERS } from "@shared/constants/calibers";
import type { PurchaseHeaderDraft, PurchaseLineDraft } from "@shared/types/purchase";
import { todayIso } from "@/lib/date";

export function buildEmptyLines(): PurchaseLineDraft[] {
  return CALIBERS.map((caliber, index) => ({
    lineId: `${caliber.id}-${index}`,
    caliberId: caliber.id,
    caliberName: caliber.name,
    category: caliber.category,
    unitPrice: 0,
    boxes: 0,
    unitsPerBox: caliber.defaultUnitsPerBox,
    totalUnits: 0,
    subtotal: 0
  }));
}

export const defaultHeader: PurchaseHeaderDraft = {
  supplierId: "",
  supplierName: "",
  customSupplierName: "",
  documentNumber: "",
  purchaseDate: todayIso(),
  responsibleName: "Luis Maldonado",
  authorizerName: "Luis Maldonado",
  deliveryMode: "retiro" as const,
  pickupLocationId: "",
  pickupLocationLabel: "",
  addressText: "",
  paymentMethod: "",
  notes: ""
};
