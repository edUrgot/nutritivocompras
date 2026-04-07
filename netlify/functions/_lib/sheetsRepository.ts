import { CALIBERS } from "../../../shared/constants/calibers";
import { BRAND } from "../../../shared/constants/brand";
import { PREDEFINED_SUPPLIERS } from "../../../shared/constants/suppliers";
import { SPREADSHEET_COLUMNS } from "../../../shared/constants/spreadsheet";
import { PARSER_ALIASES } from "../../../shared/parser/aliases";
import type { ComparePayload } from "../../../shared/types/compare";
import type { DashboardPayload } from "../../../shared/types/dashboard";
import type { LatestPriceRecord, PurchasePayload, PurchaseSummary } from "../../../shared/types/purchase";
import type { Supplier } from "../../../shared/types/supplier";
import { getSheetsClient } from "./sheetsClient";
import type { AppEnv } from "./env";

type MemoryStore = {
  providers: Supplier[];
  pickupLocations: Array<{
    id: string;
    supplierId: string;
    supplierName: string;
    label: string;
    addressLine: string;
    isActive: boolean;
  }>;
  latestPrices: LatestPriceRecord[];
  purchases: PurchaseSummary[];
};

const memoryStore: MemoryStore = {
  providers: PREDEFINED_SUPPLIERS.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    supplierType: supplier.type === "other" ? "other" : "predefined",
    isPredefined: supplier.type !== "other",
    isActive: true
  })),
  pickupLocations: [
    {
      id: "loc-sf-1",
      supplierId: "comercial-sin-frontera",
      supplierName: "Comercial Sin Frontera",
      label: "Bodega Comercial Sin Frontera",
      addressLine: "Nueva Rengifo 271, Recoleta",
      isActive: true
    },
    {
      id: "loc-sm-1",
      supplierId: "comercial-santa-minerva",
      supplierName: "Comercial Santa Minerva",
      label: "Punto de retiro Santa Minerva",
      addressLine: "Berna 6775, La Cisterna",
      isActive: true
    }
  ],
  latestPrices: [],
  purchases: []
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CL").format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
}

function dedupeByKey<T>(items: T[], getKey: (item: T) => string) {
  return Object.values(
    items.reduce<Record<string, T>>((acc, item) => {
      acc[getKey(item)] = item;
      return acc;
    }, {})
  );
}

type ReadMode = "strict" | "lenient";

export class SheetsRepository {
  constructor(private env: AppEnv) {}

  private log(stage: string, details: Record<string, unknown>) {
    console.log(`[SheetsRepository] ${stage}`, details);
  }

  private async withSheetsOperation<T>(
    operation: "get" | "append" | "update" | "preflight",
    sheetName: string,
    range: string,
    execute: () => Promise<T>,
    metadata?: Record<string, unknown>
  ) {
    this.log("operation:start", { operation, sheetName, range, ...metadata });
    try {
      const result = await execute();
      this.log("operation:success", { operation, sheetName, range, ...metadata });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Sheets error";
      this.log("operation:error", { operation, sheetName, range, message, ...metadata });
      throw new Error(`[${operation}] ${sheetName} ${range}: ${message}`);
    }
  }

  async getBootstrapData() {
    const providers = await this.readSheetObjects(this.env.sheets.providers, "lenient");
    const pickupLocations = await this.readSheetObjects(this.env.sheets.pickupLocations, "lenient");
    const parserAliases = await this.readSheetObjects(this.env.sheets.parserAliases, "lenient");
    const appSettings = await this.readSheetObjects(this.env.sheets.appSettings, "lenient");

    return {
      suppliers:
        providers.length > 0
          ? dedupeByKey(
              providers.map((row) => ({
                id: String(row.supplier_id),
                name: String(row.supplier_name),
                supplierType: row.supplier_type === "custom" ? "custom" : row.supplier_type === "other" ? "other" : "predefined",
                isPredefined: String(row.is_predefined) === "true",
                isActive: String(row.is_active) !== "false",
                notes: String(row.notes || "")
              })),
              (item) => item.id
            )
          : memoryStore.providers,
      pickupLocations:
        pickupLocations.length > 0
          ? pickupLocations.map((row) => ({
              id: String(row.location_id),
              supplierId: String(row.supplier_id),
              supplierName: String(row.supplier_name),
              label: String(row.location_label),
              addressLine: String(row.address_line),
              commune: String(row.commune || ""),
              region: String(row.region || ""),
              notes: String(row.notes || ""),
              isActive: String(row.is_active) !== "false"
            }))
          : memoryStore.pickupLocations,
      calibers: CALIBERS,
      parserAliases:
        parserAliases.length > 0
          ? parserAliases.map((row) => ({
              alias: String(row.alias),
              normalizedAlias: String(row.normalized_alias || row.alias),
              caliberId: String(row.caliber_id),
              category: String(row.category).includes("color") ? "color" : "blanco",
              priority: Number(row.priority || 0)
            }))
          : PARSER_ALIASES.map((entry, index) => ({
              alias: entry.alias,
              normalizedAlias: entry.alias,
              caliberId: entry.caliberId,
              category: entry.caliberId.includes("color") ? "color" : "blanco",
              priority: 100 - index
            })),
      branding: BRAND,
      appSettings:
        appSettings.length > 0
          ? Object.fromEntries(appSettings.map((row) => [String(row.setting_key), String(row.setting_value)]))
          : {
              currency: "CLP",
              documentPrefix: "C"
            }
    };
  }

  async upsertProvider(provider: Supplier) {
    this.log("upsertProvider:start", { supplierId: provider.id, supplierName: provider.name });
    const existing = memoryStore.providers.find((item) => item.id === provider.id || item.name === provider.name);
    if (existing) {
      Object.assign(existing, provider);
    } else {
      memoryStore.providers.push(provider);
    }

    await this.upsertByKey(this.env.sheets.providers, "supplier_id", provider.id, [
      provider.id,
      provider.name,
      provider.supplierType,
      String(provider.isPredefined),
      String(provider.isActive),
      new Date().toISOString(),
      new Date().toISOString(),
      provider.notes || ""
    ]);

    this.log("upsertProvider:success", { supplierId: provider.id, supplierName: provider.name });
    return provider;
  }

  async savePurchase(payload: PurchasePayload, purchaseId: string): Promise<PurchaseSummary> {
    this.log("savePurchase:start", {
      purchaseId,
      supplierId: payload.header.supplierId,
      supplierName: payload.header.supplierName,
      purchaseDate: payload.header.purchaseDate,
      lines: payload.lines.length
    });

    await this.ensurePurchaseSheetsReady();

    const sanitizedHeader = {
      ...payload.header,
      supplierName: payload.header.supplierId === "otro" ? payload.header.customSupplierName || payload.header.supplierName : payload.header.supplierName
    };

    const lines = payload.lines
      .map((line, index) => ({
        ...line,
        lineId: line.lineId || `${purchaseId}-${index}`,
        totalUnits: line.boxes * line.unitsPerBox,
        subtotal: line.boxes * line.unitsPerBox * line.unitPrice
      }))
      .filter((line) => line.boxes > 0 && line.unitPrice > 0);

    const totalBoxes = lines.reduce((sum, line) => sum + line.boxes, 0);
    const totalUnits = lines.reduce((sum, line) => sum + line.totalUnits, 0);
    const grandTotal = lines.reduce((sum, line) => sum + line.subtotal, 0);

    const summary: PurchaseSummary = {
      purchaseId,
      createdAt: new Date().toISOString(),
      header: sanitizedHeader,
      lines,
      totalBoxes,
      totalUnits,
      avgPricePerEgg: totalUnits ? grandTotal / totalUnits : 0,
      grandTotal,
      purchasedCaliberCount: lines.length
    };

    memoryStore.purchases.push(summary);

    this.log("savePurchase:header", { purchaseId, sheet: this.env.sheets.purchaseHeaders });
    await this.appendRow(this.env.sheets.purchaseHeaders, [
      purchaseId,
      summary.createdAt,
      sanitizedHeader.purchaseDate,
      sanitizedHeader.supplierId,
      sanitizedHeader.supplierName,
      sanitizedHeader.documentNumber,
      sanitizedHeader.responsibleName,
      sanitizedHeader.authorizerName,
      sanitizedHeader.deliveryMode,
      sanitizedHeader.pickupLocationId || "",
      sanitizedHeader.pickupLocationLabel || "",
      sanitizedHeader.addressText,
      sanitizedHeader.paymentMethod,
      sanitizedHeader.notes,
      String(summary.purchasedCaliberCount),
      String(totalBoxes),
      String(totalUnits),
      String(summary.avgPricePerEgg),
      String(grandTotal),
      "CLP",
      "confirmed"
    ]);

    for (const line of lines) {
      this.log("savePurchase:line", { purchaseId, lineId: line.lineId, caliberId: line.caliberId, sheet: this.env.sheets.purchaseLines });
      await this.appendRow(this.env.sheets.purchaseLines, [
        purchaseId,
        line.lineId,
        line.caliberId,
        line.caliberName,
        line.category,
        String(line.unitPrice),
        String(line.boxes),
        String(line.unitsPerBox),
        String(line.totalUnits),
        String(line.subtotal),
        "manual",
        String(line.parserConfidence ?? ""),
        line.parserRawLabel || ""
      ]);
    }

    this.log("savePurchase:latestPrices", { purchaseId, updates: summary.lines.length });
    await this.upsertLatestPrices(summary);
    this.log("savePurchase:success", { purchaseId });
    return summary;
  }

  async upsertLatestPrices(summary: PurchaseSummary) {
    await this.ensureSheetHeaders(this.env.sheets.latestPrices, SPREADSHEET_COLUMNS.latestPrices);
    for (const line of summary.lines) {
      const record: LatestPriceRecord = {
        supplierId: summary.header.supplierId,
        supplierName: summary.header.supplierName,
        caliberId: line.caliberId,
        caliberName: line.caliberName,
        unitPrice: line.unitPrice,
        defaultUnitsPerBox: line.unitsPerBox,
        lastPurchaseId: summary.purchaseId,
        lastPurchaseDate: summary.header.purchaseDate,
        updatedAt: summary.createdAt
      };

      const existingIndex = memoryStore.latestPrices.findIndex(
        (item) => item.supplierId === record.supplierId && item.caliberId === record.caliberId
      );
      if (existingIndex >= 0) {
        memoryStore.latestPrices[existingIndex] = record;
      } else {
        memoryStore.latestPrices.push(record);
      }

      this.log("upsertLatestPrices:item", {
        purchaseId: summary.purchaseId,
        supplierId: record.supplierId,
        caliberId: record.caliberId,
        sheet: this.env.sheets.latestPrices
      });
      await this.upsertByCompositeKey(this.env.sheets.latestPrices, ["supplier_id", "caliber_id"], [record.supplierId, record.caliberId], [
        record.supplierId,
        record.supplierName,
        record.caliberId,
        record.caliberName,
        String(record.unitPrice),
        String(record.defaultUnitsPerBox),
        record.lastPurchaseId || "",
        record.lastPurchaseDate || "",
        record.updatedAt || ""
      ]);
    }
  }

  async getNextDocumentNumber(purchaseDate: string) {
    const headers = await this.readSheetObjects(this.env.sheets.purchaseHeaders, "strict");
    const compactDate = purchaseDate.replace(/-/g, "");
    const prefix = `C${compactDate}`;
    const existing = headers
      .map((row) => String(row.document_number || ""))
      .filter((documentNumber) => documentNumber === prefix || documentNumber.startsWith(`${prefix}-`));

    if (existing.length === 0) {
      return { documentNumber: prefix };
    }

    let maxSequence = 1;
    for (const documentNumber of existing) {
      const match = documentNumber.match(new RegExp(`^${prefix}(?:-(\\d+))?$`));
      if (!match) continue;
      const sequence = match[1] ? Number(match[1]) : 1;
      if (sequence > maxSequence) {
        maxSequence = sequence;
      }
    }

    return { documentNumber: `${prefix}-${maxSequence + 1}` };
  }

  async getLatestPrices(supplierId?: string) {
    const sheetRows = await this.readSheetObjects(this.env.sheets.latestPrices, "lenient");
    if (sheetRows.length > 0) {
      const latestPrices = dedupeByKey(
        sheetRows.map((item) => this.mapLatestPriceRecord(item)),
        (item) => `${item.supplierId}-${item.caliberId}`
      ).filter((item) => (supplierId ? item.supplierId === supplierId : true));

      return { latestPrices };
    }

    return {
      latestPrices: memoryStore.latestPrices.filter((item) => (supplierId ? item.supplierId === supplierId : true))
    };
  }

  async getCompareData(): Promise<ComparePayload> {
    const latest = (await this.getLatestPrices()).latestPrices;
    const matrix = latest.map((item) => ({
      supplierId: item.supplierId,
      supplierName: item.supplierName,
      caliberId: item.caliberId,
      caliberName: item.caliberName,
      unitPrice: item.unitPrice,
      updatedAt: item.updatedAt || ""
    }));

    const cheapestByCaliber = Object.values(
      matrix.reduce<Record<string, ComparePayload["cheapestByCaliber"][number]>>((acc, item) => {
        const current = acc[item.caliberId];
        if (!current || item.unitPrice < current.unitPrice) {
          acc[item.caliberId] = {
            caliberId: item.caliberId,
            caliberName: item.caliberName,
            supplierName: item.supplierName,
            unitPrice: item.unitPrice ?? 0
          };
        }
        return acc;
      }, {})
    );

    const purchases = await this.getPurchasesFromSource();
    const historySeries = purchases.slice(-10).map((purchase) => ({
      label: purchase.header.purchaseDate,
      supplier: purchase.header.supplierName,
      value: purchase.avgPricePerEgg
    }));

    return { matrix, cheapestByCaliber, historySeries };
  }

  async getDashboardData(): Promise<DashboardPayload> {
    const purchases = await this.getPurchasesFromSource();
    const purchaseCount = purchases.length;
    const totalBoxes = purchases.reduce((sum, item) => sum + item.totalBoxes, 0);
    const totalUnits = purchases.reduce((sum, item) => sum + item.totalUnits, 0);
    const totalSpend = purchases.reduce((sum, item) => sum + item.grandTotal, 0);

    const spendTrend = purchases.map((purchase) => ({
      label: purchase.header.purchaseDate,
      value: purchase.grandTotal
    }));

    const supplierShare = Object.entries(
      purchases.reduce<Record<string, number>>((acc, purchase) => {
        acc[purchase.header.supplierName] = (acc[purchase.header.supplierName] || 0) + purchase.grandTotal;
        return acc;
      }, {})
    )
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const caliberShare = Object.entries(
      purchases.flatMap((purchase) => purchase.lines).reduce<Record<string, number>>((acc, line) => {
        acc[line.caliberName] = (acc[line.caliberName] || 0) + line.boxes;
        return acc;
      }, {})
    )
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const avgPriceTrend = purchases.map((purchase) => ({
      label: purchase.header.purchaseDate,
      value: purchase.avgPricePerEgg
    }));

    return {
      kpis: [
        { label: "Promedio cajas / dia", value: formatNumber(purchaseCount ? totalBoxes / purchaseCount : 0) },
        { label: "Promedio cajas / semana", value: formatNumber(purchaseCount ? (totalBoxes / purchaseCount) * 7 : 0) },
        { label: "Promedio cajas / mes", value: formatNumber(purchaseCount ? (totalBoxes / purchaseCount) * 30 : 0) },
        { label: "Promedio costo por huevo", value: formatCurrency(totalUnits ? totalSpend / totalUnits : 0) },
        { label: "Gasto total", value: formatCurrency(totalSpend) },
        { label: "Cajas totales", value: formatNumber(totalBoxes) },
        { label: "Proveedor mas comprado", value: supplierShare[0]?.label || "Sin datos" },
        { label: "Calibre mas comprado", value: caliberShare[0]?.label || "Sin datos" }
      ],
      spendTrend,
      supplierShare,
      caliberShare,
      avgPriceTrend
    };
  }

  async saveSettings(payload: unknown) {
    const data = payload as {
      providers?: Array<Record<string, string>>;
      pickupLocations?: Array<Record<string, string>>;
      parserAliases?: Array<Record<string, string>>;
      boxUnits?: Record<string, number>;
    };

    for (const provider of data.providers ?? []) {
      const providerId = provider.supplier_id || provider.id || "";
      await this.upsertByKey(this.env.sheets.providers, "supplier_id", providerId, [
        providerId,
        provider.supplier_name || provider.name || "",
        provider.supplier_type || "custom",
        provider.is_predefined || "false",
        provider.is_active || "true",
        new Date().toISOString(),
        new Date().toISOString(),
        provider.notes || ""
      ]);
    }

    for (const location of data.pickupLocations ?? []) {
      await this.upsertByKey(this.env.sheets.pickupLocations, "location_id", location.location_id || "", [
        location.location_id || "",
        location.supplier_id || "",
        location.supplier_name || "",
        location.location_label || "",
        location.address_line || "",
        location.commune || "",
        location.region || "",
        location.notes || "",
        location.is_active || "true",
        new Date().toISOString(),
        new Date().toISOString()
      ]);
    }

    for (const alias of data.parserAliases ?? []) {
      const aliasKey = `${alias.alias || ""}-${alias.caliber_id || ""}`;
      await this.upsertByCompositeKey(this.env.sheets.parserAliases, ["alias", "caliber_id"], [alias.alias || "", alias.caliber_id || ""], [
        alias.alias || "",
        alias.normalized_alias || alias.alias || "",
        alias.caliber_id || "",
        alias.caliber_name || "",
        alias.category || "",
        alias.priority || "0",
        alias.is_active || "true",
        alias.notes || aliasKey
      ]);
    }

    for (const [caliberId, units] of Object.entries(data.boxUnits ?? {})) {
      const settingKey = `boxUnits.${caliberId}`;
      await this.upsertByKey(this.env.sheets.appSettings, "setting_key", settingKey, [
        settingKey,
        "box_units",
        String(units),
        "number",
        `Unidades por caja para ${caliberId}`,
        new Date().toISOString()
      ]);
    }

    return true;
  }

  private async getPurchasesFromSource() {
    const headers = await this.readSheetObjects(this.env.sheets.purchaseHeaders, "lenient");
    const lines = await this.readSheetObjects(this.env.sheets.purchaseLines, "lenient");
    if (headers.length === 0 || lines.length === 0) {
      return memoryStore.purchases;
    }

    return headers.map((header) => {
      const purchaseLines = lines
        .filter((line) => String(line.purchase_id) === String(header.purchase_id))
        .map((line) => ({
          lineId: String(line.line_id),
          caliberId: String(line.caliber_id),
          caliberName: String(line.caliber_name),
          category: String(line.category).includes("color") ? "color" : "blanco",
          unitPrice: Number(line.unit_price || 0),
          boxes: Number(line.boxes || 0),
          unitsPerBox: Number(line.units_per_box || 0),
          totalUnits: Number(line.total_units || 0),
          subtotal: Number(line.line_subtotal || 0),
          parserConfidence: Number(line.parser_confidence || 0),
          parserRawLabel: String(line.parser_raw_label || "")
        }));

      return {
        purchaseId: String(header.purchase_id),
        createdAt: String(header.created_at),
        header: {
          supplierId: String(header.supplier_id),
          supplierName: String(header.supplier_name),
          documentNumber: String(header.document_number),
          purchaseDate: String(header.purchase_date),
          responsibleName: String(header.responsible_name),
          authorizerName: String(header.authorizer_name),
          deliveryMode: String(header.delivery_mode) === "despacho" ? "despacho" : "retiro",
          pickupLocationId: String(header.pickup_location_id || ""),
          pickupLocationLabel: String(header.pickup_location_label || ""),
          addressText: String(header.address_text || ""),
          paymentMethod: String(header.payment_method || ""),
          notes: String(header.notes || "")
        },
        lines: purchaseLines,
        totalBoxes: Number(header.total_boxes || 0),
        totalUnits: Number(header.total_units || 0),
        avgPricePerEgg: Number(header.avg_price_per_egg || 0),
        grandTotal: Number(header.grand_total || 0),
        purchasedCaliberCount: Number(header.line_count || purchaseLines.length)
      };
    });
  }

  private async appendRow(sheetName: string, values: string[]) {
    const sheets = await getSheetsClient(this.env);
    if (!sheets || !this.env.spreadsheetId) {
      throw new Error(`Sheets client is not configured for append on ${sheetName}`);
    }
    await this.withSheetsOperation(
      "append",
      sheetName,
      `${sheetName}!A1`,
      () =>
        sheets.spreadsheets.values.append({
          spreadsheetId: this.env.spreadsheetId,
          range: `${sheetName}!A1`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [values]
          }
        }),
      { rows: 1 }
    );
  }

  private async upsertByKey(sheetName: string, keyHeader: string, keyValue: string, values: string[]) {
    const sheets = await getSheetsClient(this.env);
    if (!sheets || !this.env.spreadsheetId) {
      throw new Error(`Sheets client is not configured for upsert on ${sheetName}`);
    }

    const rows = await this.readSheetRows(sheetName, "strict");
    if (rows.length === 0) {
      throw new Error(`La hoja ${sheetName} no contiene headers en la fila 1.`);
    }

    const headers = rows[0];
    const keyIndex = headers.indexOf(keyHeader);
    if (keyIndex === -1) {
      throw new Error(`La hoja ${sheetName} no contiene el header clave ${keyHeader}.`);
    }

    const rowIndex = rows.findIndex((row, index) => index > 0 && String(row[keyIndex] ?? "") === keyValue);
    if (rowIndex === -1) {
      await this.appendRow(sheetName, values);
      return;
    }

    await this.withSheetsOperation(
      "update",
      sheetName,
      `${sheetName}!A${rowIndex + 1}`,
      () =>
        sheets.spreadsheets.values.update({
          spreadsheetId: this.env.spreadsheetId,
          range: `${sheetName}!A${rowIndex + 1}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [values]
          }
        }),
      { keyHeader, keyValue }
    );
  }

  private async upsertByCompositeKey(sheetName: string, keyHeaders: string[], keyValues: string[], values: string[]) {
    const sheets = await getSheetsClient(this.env);
    if (!sheets || !this.env.spreadsheetId) {
      throw new Error(`Sheets client is not configured for composite upsert on ${sheetName}`);
    }

    const rows = await this.readSheetRows(sheetName, "strict");
    if (rows.length === 0) {
      throw new Error(`La hoja ${sheetName} no contiene headers en la fila 1.`);
    }

    const headers = rows[0];
    const keyIndexes = keyHeaders.map((header) => headers.indexOf(header));
    if (keyIndexes.some((index) => index === -1)) {
      throw new Error(`La hoja ${sheetName} no contiene todos los headers clave requeridos: ${keyHeaders.join(", ")}`);
    }

    const rowIndex = rows.findIndex(
      (row, index) => index > 0 && keyIndexes.every((keyIndex, position) => String(row[keyIndex] ?? "") === keyValues[position])
    );
    if (rowIndex === -1) {
      await this.appendRow(sheetName, values);
      return;
    }

    await this.withSheetsOperation(
      "update",
      sheetName,
      `${sheetName}!A${rowIndex + 1}`,
      () =>
        sheets.spreadsheets.values.update({
          spreadsheetId: this.env.spreadsheetId,
          range: `${sheetName}!A${rowIndex + 1}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [values]
          }
        }),
      { keyHeaders, keyValues }
    );
  }

  private mapLatestPriceRecord(item: Record<string, string | number>): LatestPriceRecord {
    return {
      supplierId: String(item.supplier_id ?? item.supplierId ?? ""),
      supplierName: String(item.supplier_name ?? item.supplierName ?? ""),
      caliberId: String(item.caliber_id ?? item.caliberId ?? ""),
      caliberName: String(item.caliber_name ?? item.caliberName ?? ""),
      unitPrice: Number(item.unit_price ?? item.unitPrice ?? 0),
      defaultUnitsPerBox: Number(item.default_units_per_box ?? item.defaultUnitsPerBox ?? 0),
      lastPurchaseId: String(item.last_purchase_id ?? item.lastPurchaseId ?? ""),
      lastPurchaseDate: String(item.last_purchase_date ?? item.lastPurchaseDate ?? ""),
      updatedAt: String(item.updated_at ?? item.updatedAt ?? "")
    };
  }

  private async readSheetObjects(sheetName: string, mode: ReadMode) {
    const rows = await this.readSheetRows(sheetName, mode);
    if (rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
  }

  private async readSheetRows(sheetName: string, mode: ReadMode) {
    const sheets = await getSheetsClient(this.env);
    if (!sheets || !this.env.spreadsheetId) {
      if (mode === "lenient") {
        return [];
      }
      throw new Error(`Sheets client is not configured for strict read on ${sheetName}`);
    }
    try {
      const response = await this.withSheetsOperation("get", sheetName, `${sheetName}!A:Z`, () =>
        sheets.spreadsheets.values.get({
          spreadsheetId: this.env.spreadsheetId,
          range: `${sheetName}!A:Z`
        })
      );
      return response.data.values ?? [];
    } catch (error) {
      if (mode === "lenient") {
        this.log("readSheetRows:lenientFallback", {
          sheetName,
          message: error instanceof Error ? error.message : "Unknown read error"
        });
        return [];
      }
      throw error;
    }
  }

  private async ensurePurchaseSheetsReady() {
    await this.ensureSheetHeaders(this.env.sheets.purchaseHeaders, SPREADSHEET_COLUMNS.purchaseHeaders);
    await this.ensureSheetHeaders(this.env.sheets.purchaseLines, SPREADSHEET_COLUMNS.purchaseLines);
    await this.ensureSheetHeaders(this.env.sheets.latestPrices, SPREADSHEET_COLUMNS.latestPrices);
  }

  private async ensureSheetHeaders(sheetName: string, expectedHeaders: readonly string[]) {
    const rows = await this.readSheetRows(sheetName, "strict");
    if (rows.length === 0) {
      throw new Error(`La hoja ${sheetName} no tiene headers. Debe contener la fila 1 con columnas definidas.`);
    }

    const actualHeaders = rows[0];
    const missingHeaders = expectedHeaders.filter((header) => !actualHeaders.includes(header));
    this.log("preflight:headers", { sheetName, actualHeaders, missingHeaders });
    if (missingHeaders.length > 0) {
      throw new Error(`La hoja ${sheetName} no tiene los headers requeridos: ${missingHeaders.join(", ")}`);
    }
  }
}
