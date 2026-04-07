import { DEFAULT_SHEET_NAMES } from "../../../shared/constants/spreadsheet";
export function readEnv() {
    return {
        serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        sheets: {
            purchaseHeaders: process.env.GOOGLE_SHEETS_PURCHASE_HEADERS || DEFAULT_SHEET_NAMES.purchaseHeaders,
            purchaseLines: process.env.GOOGLE_SHEETS_PURCHASE_LINES || DEFAULT_SHEET_NAMES.purchaseLines,
            providers: process.env.GOOGLE_SHEETS_PROVIDERS || DEFAULT_SHEET_NAMES.providers,
            latestPrices: process.env.GOOGLE_SHEETS_LATEST_PRICES || DEFAULT_SHEET_NAMES.latestPrices,
            pickupLocations: process.env.GOOGLE_SHEETS_PICKUP_LOCATIONS || DEFAULT_SHEET_NAMES.pickupLocations,
            parserAliases: process.env.GOOGLE_SHEETS_PARSER_ALIASES || DEFAULT_SHEET_NAMES.parserAliases,
            appSettings: process.env.GOOGLE_SHEETS_APP_SETTINGS || DEFAULT_SHEET_NAMES.appSettings
        }
    };
}
