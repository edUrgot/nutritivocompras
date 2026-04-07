import { getBootstrapPayload } from "./_lib/bootstrapService";
import { readEnv } from "./_lib/env";
import { ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";
export const handler = async () => {
    try {
        const repository = new SheetsRepository(readEnv());
        return ok(await getBootstrapPayload(repository));
    }
    catch (error) {
        return serverError(error);
    }
};
