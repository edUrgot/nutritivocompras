# Despliegue en Netlify

1. Sube este proyecto a GitHub.
2. Crea un sitio nuevo en Netlify desde ese repositorio.
3. Configura variables de entorno:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SPREADSHEET_ID`
   - nombres de hojas si quieres sobrescribir defaults
4. Verifica la configuración:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
5. Ejecuta el deploy.
6. Comprueba:
   - `/`
   - `/compare`
   - `/dashboard`
   - `/settings`
   - `/.netlify/functions/bootstrap`
