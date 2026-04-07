import { DEFAULT_SHEET_NAMES, type SheetConfig } from "../../../shared/constants/spreadsheet";

export interface AppEnv {
  serviceAccountEmail?: string;
  privateKey?: string;
  spreadsheetId?: string;
  sheets: SheetConfig;
}

function normalizePrivateKey(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  let key = value.trim();

  // quita comillas envolventes repetidas
  while (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }

  // normaliza saltos de línea reales y escapados
  key = key
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\\n/g, "\n")
    .trim();

  // por si alguien pegó la clave en base64 completa
  if (!key.includes("BEGIN PRIVATE KEY") && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf8").trim();
      if (decoded.includes("BEGIN PRIVATE KEY")) {
        key = decoded;
      }
    } catch {
      // ignorar y seguir con la validación normal
    }
  }

  return key;
}

function validatePrivateKey(value?: string): string | undefined {
  const key = normalizePrivateKey(value);

  if (!key) {
    return undefined;
  }

  const hasBegin = key.includes("-----BEGIN PRIVATE KEY-----");
  const hasEnd = key.includes("-----END PRIVATE KEY-----");
  const newlineCount = (key.match(/\n/g) ?? []).length;

  if (!hasBegin || !hasEnd) {
    throw new Error(
      `GOOGLE_PRIVATE_KEY inválida: hasBegin=${hasBegin}, hasEnd=${hasEnd}, newlineCount=${newlineCount}, length=${key.length}`
    );
  }

  return key;
}

export function readEnv(): AppEnv {
  return {
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: validatePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
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