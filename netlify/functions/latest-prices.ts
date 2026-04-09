import type { Handler } from "@netlify/functions";
import type { SaveLatestPricePayload } from "../../shared/types/compare";
import { readEnv } from "./_lib/env";
import { badRequest, ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";

export const handler: Handler = async (event) => {
  try {
    const repository = new SheetsRepository(readEnv());
    if (event.httpMethod === "POST") {
      const payload = JSON.parse(event.body || "{}") as Partial<SaveLatestPricePayload>;
      if (!payload.supplierId || !payload.supplierName || !payload.caliberId || !Number(payload.unitPrice)) {
        return badRequest("Debes enviar supplierId, supplierName, caliberId y unitPrice para guardar un precio manual.");
      }

      return ok(
        await repository.upsertLatestPriceRecord({
          supplierId: payload.supplierId,
          supplierName: payload.supplierName,
          caliberId: payload.caliberId,
          unitPrice: Number(payload.unitPrice)
        })
      );
    }

    return ok(await repository.getLatestPrices(event.queryStringParameters?.supplierId));
  } catch (error) {
    return serverError(error);
  }
};
