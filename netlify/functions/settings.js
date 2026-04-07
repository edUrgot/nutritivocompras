import { readEnv } from "./_lib/env";
import { ok, serverError } from "./_lib/response";
import { saveSettingsFlow } from "./_lib/settingsService";
import { SheetsRepository } from "./_lib/sheetsRepository";
export const handler = async (event) => {
    try {
        const repository = new SheetsRepository(readEnv());
        const body = JSON.parse(event.body || "{}");
        return ok(await saveSettingsFlow(repository, body));
    }
    catch (error) {
        return serverError(error);
    }
};
