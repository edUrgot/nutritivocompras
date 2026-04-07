import { type SheetConfig } from "../../../shared/constants/spreadsheet";
export interface AppEnv {
    serviceAccountEmail?: string;
    privateKey?: string;
    spreadsheetId?: string;
    sheets: SheetConfig;
}
export declare function readEnv(): AppEnv;
