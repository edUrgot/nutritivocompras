import type { CaliberCategory } from "../constants/calibers";

export interface CompareSupplier {
  supplierId: string;
  supplierName: string;
}

export interface CompareCaliber {
  caliberId: string;
  caliberName: string;
  shortName: string;
  category: CaliberCategory;
}

export interface CompareCell {
  supplierId: string;
  supplierName: string;
  caliberId: string;
  caliberName: string;
  unitPrice: number | null;
  shortName?: string;
  category?: CaliberCategory;
  updatedAt?: string;
  lastPurchaseDate?: string;
}

export interface CheapestByCaliber {
  caliberId: string;
  caliberName: string;
  supplierName: string;
  unitPrice: number;
}

export interface ComparePayload {
  suppliers: CompareSupplier[];
  calibers: CompareCaliber[];
  matrix: CompareCell[];
  cheapestByCaliber: CheapestByCaliber[];
  historySeries: Array<{
    label: string;
    supplier: string;
    value: number;
  }>;
}

export interface SaveLatestPricePayload {
  supplierId: string;
  supplierName: string;
  caliberId: string;
  unitPrice: number;
}
