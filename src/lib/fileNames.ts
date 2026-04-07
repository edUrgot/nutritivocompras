export function buildExportFilename(prefix: string, documentNumber: string) {
  const safe = (documentNumber || "sin-documento").replace(/[^a-zA-Z0-9-_]/g, "-");
  return `${prefix}-${safe}`;
}
