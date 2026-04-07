import { readEnv } from "./_lib/env";
import { ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";
export const handler = async (event) => {
    try {
        const repository = new SheetsRepository(readEnv());
        return ok(await repository.getLatestPrices(event.queryStringParameters?.supplierId));
    }
    catch (error) {
        return serverError(error);
    }
};
