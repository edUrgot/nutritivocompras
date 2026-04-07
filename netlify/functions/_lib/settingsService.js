import { settingsUpdateSchema } from "../../../shared/validation/settings";
export async function saveSettingsFlow(repository, body) {
    const payload = settingsUpdateSchema.parse(body);
    await repository.saveSettings(payload);
    return { ok: true, updatedAt: new Date().toISOString() };
}
