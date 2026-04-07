export interface Supplier {
    id: string;
    name: string;
    supplierType: "predefined" | "custom" | "other";
    isPredefined: boolean;
    isActive: boolean;
    notes?: string;
}
export interface PickupLocation {
    id: string;
    supplierId: string;
    supplierName: string;
    label: string;
    addressLine: string;
    commune?: string;
    region?: string;
    notes?: string;
    isActive: boolean;
}
