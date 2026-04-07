import type { ComparePayload } from "../../../shared/types/compare";
import type { DashboardPayload } from "../../../shared/types/dashboard";
import type { LatestPriceRecord, PurchasePayload, PurchaseSummary } from "../../../shared/types/purchase";
import type { Supplier } from "../../../shared/types/supplier";
import type { AppEnv } from "./env";
export declare class SheetsRepository {
    private env;
    constructor(env: AppEnv);
    private log;
    private withSheetsOperation;
    getBootstrapData(): Promise<{
        suppliers: {
            id: string;
            name: string;
            supplierType: string;
            isPredefined: boolean;
            isActive: boolean;
            notes: string;
        }[] | Supplier[];
        pickupLocations: {
            id: string;
            supplierId: string;
            supplierName: string;
            label: string;
            addressLine: string;
            isActive: boolean;
        }[];
        calibers: import("../../../shared/constants/calibers").CaliberDefinition[];
        parserAliases: {
            alias: string;
            normalizedAlias: string;
            caliberId: string;
            category: string;
            priority: number;
        }[];
        branding: {
            readonly appName: "Compras Nutritivo Chile";
            readonly subtitle: "Resumen comercial";
            readonly colors: {
                readonly primary: "#16345d";
                readonly secondary: "#4e82d7";
                readonly accent: "#ecb71e";
                readonly surface: "#f5f7fb";
                readonly text: "#1b2430";
            };
        };
        appSettings: {
            [k: string]: string;
        };
    }>;
    upsertProvider(provider: Supplier): Promise<Supplier>;
    savePurchase(payload: PurchasePayload, purchaseId: string): Promise<PurchaseSummary>;
    upsertLatestPrices(summary: PurchaseSummary): Promise<void>;
    getNextDocumentNumber(purchaseDate: string): Promise<{
        documentNumber: string;
    }>;
    getLatestPrices(supplierId?: string): Promise<{
        latestPrices: LatestPriceRecord[];
    }>;
    getCompareData(): Promise<ComparePayload>;
    getDashboardData(): Promise<DashboardPayload>;
    saveSettings(payload: unknown): Promise<boolean>;
    private getPurchasesFromSource;
    private appendRow;
    private upsertByKey;
    private upsertByCompositeKey;
    private mapLatestPriceRecord;
    private readSheetObjects;
    private readSheetRows;
    private ensurePurchaseSheetsReady;
    private ensureSheetHeaders;
}
