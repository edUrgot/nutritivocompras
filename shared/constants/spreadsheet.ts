export const DEFAULT_SHEET_NAMES = {
  purchaseHeaders: "purchase_headers",
  purchaseLines: "purchase_lines",
  providers: "providers",
  latestPrices: "latest_prices",
  pickupLocations: "pickup_locations",
  parserAliases: "parser_aliases",
  appSettings: "app_settings"
} as const;

export type SheetConfigKey = keyof typeof DEFAULT_SHEET_NAMES;

export type SheetConfig = Record<SheetConfigKey, string>;

export const SPREADSHEET_COLUMNS = {
  purchaseHeaders: [
    "purchase_id",
    "created_at",
    "purchase_date",
    "supplier_id",
    "supplier_name",
    "document_number",
    "responsible_name",
    "authorizer_name",
    "delivery_mode",
    "pickup_location_id",
    "pickup_location_label",
    "address_text",
    "payment_method",
    "notes",
    "line_count",
    "total_boxes",
    "total_units",
    "avg_price_per_egg",
    "grand_total",
    "currency",
    "status"
  ],
  purchaseLines: [
    "purchase_id",
    "line_id",
    "caliber_id",
    "caliber_name",
    "category",
    "unit_price",
    "boxes",
    "units_per_box",
    "total_units",
    "line_subtotal",
    "source_type",
    "parser_confidence",
    "parser_raw_label"
  ],
  providers: ["supplier_id", "supplier_name", "supplier_type", "is_predefined", "is_active", "created_at", "updated_at", "notes"],
  latestPrices: ["supplier_id", "supplier_name", "caliber_id", "caliber_name", "unit_price", "default_units_per_box", "last_purchase_id", "last_purchase_date", "updated_at"],
  pickupLocations: ["location_id", "supplier_id", "supplier_name", "location_label", "address_line", "commune", "region", "notes", "is_active", "created_at", "updated_at"],
  parserAliases: ["alias", "normalized_alias", "caliber_id", "caliber_name", "category", "priority", "is_active", "notes"],
  appSettings: ["setting_key", "setting_group", "setting_value", "value_type", "description", "updated_at"]
} as const;
