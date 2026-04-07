import type { SheetsRepository } from "./sheetsRepository";
export declare function savePurchaseFlow(repository: SheetsRepository, rawBody: unknown): Promise<{
    purchaseId: string;
    savedAt: string;
    summary: import("../../../shared/types/purchase").PurchaseSummary;
}>;
