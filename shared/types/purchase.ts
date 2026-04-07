import type { CaliberCategory } from "../constants/calibers";
import type { PickupLocation, Supplier } from "./supplier";

export interface PurchaseLineDraft {
  lineId: string;
  caliberId: string;
  caliberName: string;
  category: CaliberCategory;
  unitPrice: number;
  boxes: number;
  unitsPerBox: number;
  totalUnits: number;
  subtotal: number;
  parserConfidence?: number;
  parserRawLabel?: string;
}

export interface PurchaseHeaderDraft {
  supplierId: string;
  supplierName: string;
  customSupplierName?: string;
  documentNumber: string;
  purchaseDate: string;
  responsibleName: string;
  authorizerName: string;
  deliveryMode: "retiro" | "despacho";
  pickupLocationId?: string;
  pickupLocationLabel?: string;
  addressText: string;
  paymentMethod: string;
  notes: string;
}

export interface PurchasePayload {
  header: PurchaseHeaderDraft;
  lines: PurchaseLineDraft[];
}

export interface PurchaseSummary {
  purchaseId: string;
  createdAt: string;
  header: PurchaseHeaderDraft;
  lines: PurchaseLineDraft[];
  totalBoxes: number;
  totalUnits: number;
  avgPricePerEgg: number;
  grandTotal: number;
  purchasedCaliberCount: number;
}

export interface LatestPriceRecord {
  supplierId: string;
  supplierName: string;
  caliberId: string;
  caliberName: string;
  unitPrice: number;
  defaultUnitsPerBox: number;
  lastPurchaseId?: string;
  lastPurchaseDate?: string;
  updatedAt?: string;
}

export interface BootstrapPayload {
  suppliers: Supplier[];
  pickupLocations: PickupLocation[];
  calibers: Array<{
    id: string;
    name: string;
    shortName: string;
    category: CaliberCategory;
    defaultUnitsPerBox: number;
  }>;
  parserAliases: Array<{
    alias: string;
    normalizedAlias: string;
    caliberId: string;
    category: CaliberCategory;
    priority: number;
  }>;
  branding: {
    appName: string;
    subtitle: string;
    colors: Record<string, string>;
  };
  appSettings: Record<string, string>;
}

export interface NextDocumentNumberPayload {
  documentNumber: string;
}
