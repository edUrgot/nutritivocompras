import { settingsUpdateSchema } from "../../../shared/validation/settings";
import type { SheetsRepository } from "./sheetsRepository";

export async function saveSettingsFlow(repository: SheetsRepository, body: unknown) {
  const payload = settingsUpdateSchema.parse(body);
  await repository.saveSettings(payload);
  return { ok: true, updatedAt: new Date().toISOString() };
}
