import type { SheetsRepository } from "./sheetsRepository";
export declare function saveSettingsFlow(repository: SheetsRepository, body: unknown): Promise<{
    ok: boolean;
    updatedAt: string;
}>;
