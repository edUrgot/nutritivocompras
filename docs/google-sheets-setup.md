# Configuración de Google Sheets

1. Crea un spreadsheet nuevo en Google Sheets.
2. Crea las 7 pestañas con los nombres exactos documentados en `spreadsheet-schema.md`.
3. Copia la fila de columnas exacta en cada pestaña.
4. En Google Cloud:
   - crea un proyecto
   - habilita `Google Sheets API`
   - crea una `Service Account`
5. Descarga o copia las credenciales de la service account.
6. Comparte el spreadsheet con el correo de la service account como `Editor`.
7. Completa las variables del archivo `.env` o de Netlify:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SPREADSHEET_ID`
8. Si pegas la private key en Netlify, respeta los saltos de línea usando `\n`.

## Validación rápida
- Abre `/.netlify/functions/bootstrap`
- Si responde JSON con proveedores y calibres, la conexión base está lista
