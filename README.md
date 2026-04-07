# Descripcion

Aplicacion web mobile-first para gestionar compras de huevos de Nutritivo Chile, interpretar precios libres, generar resumen comercial profesional, exportar PDF/imagen/Excel y registrar historico real en Google Sheets.

## Stack

- Frontend: React + TypeScript + Vite
- UI: Tailwind CSS
- Estado remoto: TanStack Query
- Formularios: React Hook Form + Zod
- Exportaciones: jsPDF, html-to-image, ExcelJS
- Backend: Netlify Functions
- Persistencia: Google Sheets

## Requisitos previos

- Node.js 20 o superior
- npm 10 o superior
- cuenta Google con spreadsheet compartible
- Netlify site creado o por crear

## Instalacion local

```bash
npm install
```

En PowerShell:

```powershell
Copy-Item .env.example .env
```

En macOS/Linux:

```bash
cp .env.example .env
```

## Variables de entorno

- `VITE_APP_NAME`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SPREADSHEET_ID`
- `GOOGLE_SHEETS_PURCHASE_HEADERS`
- `GOOGLE_SHEETS_PURCHASE_LINES`
- `GOOGLE_SHEETS_PROVIDERS`
- `GOOGLE_SHEETS_LATEST_PRICES`
- `GOOGLE_SHEETS_PICKUP_LOCATIONS`
- `GOOGLE_SHEETS_PARSER_ALIASES`
- `GOOGLE_SHEETS_APP_SETTINGS`

## Configuracion de Google Sheets

1. Crea un spreadsheet nuevo.
2. Crea estas pestanas: `purchase_headers`, `purchase_lines`, `providers`, `latest_prices`, `pickup_locations`, `parser_aliases`, `app_settings`.
3. Copia las columnas desde [docs/spreadsheet-schema.md](/C:/Users/Edu/Documents/Playground/docs/spreadsheet-schema.md).
4. Crea una service account en Google Cloud.
5. Habilita Google Sheets API.
6. Comparte el spreadsheet con el correo de la service account como editor.
7. Completa `.env`.

## Estructura del spreadsheet

La estructura completa esta documentada en [docs/spreadsheet-schema.md](/C:/Users/Edu/Documents/Playground/docs/spreadsheet-schema.md).

## Levantar en desarrollo

```bash
npm run dev
```

Para frontend + functions:

```bash
npx netlify dev
```

## Build de produccion

```bash
npm run build
```

## Despliegue en Netlify

Luego, en Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

Verifica:
- `/`
- `/compare`
- `/dashboard`
- `/settings`
- `/.netlify/functions/bootstrap`

## Flujo operativo de uso

1. Selecciona proveedor.
2. Pega precios o carga ultimos precios.
3. Interpreta el texto.
4. Ajusta precio, cajas y unidades por caja.
5. Completa datos comerciales.
6. Revisa el resumen.
7. Descarga PDF, imagen o Excel.
8. Guarda compra en Google Sheets.

## Exportaciones

- PDF corporativo desde el mismo resumen visual
- Imagen PNG del resumen
- Excel `.xlsx` con hoja `Resumen` y hoja `Detalle`

## Pruebas

```bash
npm run test
```

Smoke manual sugerido:
- proveedor nuevo con `Otro`
- retiro con autocompletado editable
- responsable y quien autoriza distintos
- exportacion PDF/PNG/XLSX
- guardado real en Sheets
- comparativo
- dashboard

## Limitaciones y siguientes pasos

- Esta version no implementa login.
- El comparativo y dashboard dependen del historico existente.
- Si no configuras credenciales, la app opera con bootstrap local y funciones en memoria.
