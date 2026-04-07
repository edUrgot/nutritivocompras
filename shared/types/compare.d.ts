export interface CompareCell {
    supplierId: string;
    supplierName: string;
    caliberId: string;
    caliberName: string;
    unitPrice: number | null;
    updatedAt?: string;
}
export interface CheapestByCaliber {
    caliberId: string;
    caliberName: string;
    supplierName: string;
    unitPrice: number;
}
export interface ComparePayload {
    matrix: CompareCell[];
    cheapestByCaliber: CheapestByCaliber[];
    historySeries: Array<{
        label: string;
        supplier: string;
        value: number;
    }>;
}
