import type { Handler } from "@netlify/functions";
import { readEnv } from "./_lib/env";
import { badRequest, ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";

export const handler: Handler = async (event) => {
  try {
    const purchaseDate = event.queryStringParameters?.date;
    if (!purchaseDate) {
      return badRequest("Missing required query param: date");
    }

    const repository = new SheetsRepository(readEnv());
    return ok(await repository.getNextDocumentNumber(purchaseDate));
  } catch (error) {
    return serverError(error);
  }
};
