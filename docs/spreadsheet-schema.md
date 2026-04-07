# Estructura del spreadsheet

## Pestañas obligatorias
- `purchase_headers`
- `purchase_lines`
- `providers`
- `latest_prices`
- `pickup_locations`
- `parser_aliases`
- `app_settings`

## Columnas
### `purchase_headers`
`purchase_id`, `created_at`, `purchase_date`, `supplier_id`, `supplier_name`, `document_number`, `responsible_name`, `authorizer_name`, `delivery_mode`, `pickup_location_id`, `pickup_location_label`, `address_text`, `payment_method`, `notes`, `line_count`, `total_boxes`, `total_units`, `avg_price_per_egg`, `grand_total`, `currency`, `status`

### `purchase_lines`
`purchase_id`, `line_id`, `caliber_id`, `caliber_name`, `category`, `unit_price`, `boxes`, `units_per_box`, `total_units`, `line_subtotal`, `source_type`, `parser_confidence`, `parser_raw_label`

### `providers`
`supplier_id`, `supplier_name`, `supplier_type`, `is_predefined`, `is_active`, `created_at`, `updated_at`, `notes`

### `latest_prices`
`supplier_id`, `supplier_name`, `caliber_id`, `caliber_name`, `unit_price`, `default_units_per_box`, `last_purchase_id`, `last_purchase_date`, `updated_at`

### `pickup_locations`
`location_id`, `supplier_id`, `supplier_name`, `location_label`, `address_line`, `commune`, `region`, `notes`, `is_active`, `created_at`, `updated_at`

### `parser_aliases`
`alias`, `normalized_alias`, `caliber_id`, `caliber_name`, `category`, `priority`, `is_active`, `notes`

### `app_settings`
`setting_key`, `setting_group`, `setting_value`, `value_type`, `description`, `updated_at`

## Datos base sugeridos
- Proveedores: `Comercial Sin Frontera`, `Comercial Santa Minerva`, `Toledo`, `Nelson`, `Otro`
- Branding: `Compras Nutritivo Chile`, `Resumen comercial`
- Direcciones editables de retiro para `Comercial Sin Frontera` y `Comercial Santa Minerva`
