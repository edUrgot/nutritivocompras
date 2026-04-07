export declare const DEFAULT_SHEET_NAMES: {
    readonly purchaseHeaders: "purchase_headers";
    readonly purchaseLines: "purchase_lines";
    readonly providers: "providers";
    readonly latestPrices: "latest_prices";
    readonly pickupLocations: "pickup_locations";
    readonly parserAliases: "parser_aliases";
    readonly appSettings: "app_settings";
};
export type SheetConfigKey = keyof typeof DEFAULT_SHEET_NAMES;
export type SheetConfig = Record<SheetConfigKey, string>;
export declare const SPREADSHEET_COLUMNS: {
    readonly purchaseHeaders: readonly ["purchase_id", "created_at", "purchase_date", "supplier_id", "supplier_name", "document_number", "responsible_name", "authorizer_name", "delivery_mode", "pickup_location_id", "pickup_location_label", "address_text", "payment_method", "notes", "line_count", "total_boxes", "total_units", "avg_price_per_egg", "grand_total", "currency", "status"];
    readonly purchaseLines: readonly ["purchase_id", "line_id", "caliber_id", "caliber_name", "category", "unit_price", "boxes", "units_per_box", "total_units", "line_subtotal", "source_type", "parser_confidence", "parser_raw_label"];
    readonly providers: readonly ["supplier_id", "supplier_name", "supplier_type", "is_predefined", "is_active", "created_at", "updated_at", "notes"];
    readonly latestPrices: readonly ["supplier_id", "supplier_name", "caliber_id", "caliber_name", "unit_price", "default_units_per_box", "last_purchase_id", "last_purchase_date", "updated_at"];
    readonly pickupLocations: readonly ["location_id", "supplier_id", "supplier_name", "location_label", "address_line", "commune", "region", "notes", "is_active", "created_at", "updated_at"];
    readonly parserAliases: readonly ["alias", "normalized_alias", "caliber_id", "caliber_name", "category", "priority", "is_active", "notes"];
    readonly appSettings: readonly ["setting_key", "setting_group", "setting_value", "value_type", "description", "updated_at"];
};
