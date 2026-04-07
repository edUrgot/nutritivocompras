import type { Handler } from "@netlify/functions";
import { readEnv } from "./_lib/env";
import { ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";
import { savePurchaseFlow } from "./_lib/purchaseService";

export const handler: Handler = async (event) => {
  const requestId = `purchase-${Date.now()}`;
  try {
    console.log("[purchases] request:start", { requestId, method: event.httpMethod });
    console.log("[purchases] parse body:start", { requestId });
    const repository = new SheetsRepository(readEnv());
    const body = JSON.parse(event.body || "{}");
    console.log("[purchases] parse body:success", { requestId });
    console.log("[purchases] savePurchaseFlow:start", { requestId });
    const result = await savePurchaseFlow(repository, body);
    console.log("[purchases] savePurchaseFlow:success", { requestId, purchaseId: result.purchaseId });
    return ok(result);
  } catch (error) {
    console.error("[purchases] request:error", {
      requestId,
      message: error instanceof Error ? error.message : "Unexpected purchases error"
    });
    return serverError(error);
  }
};
