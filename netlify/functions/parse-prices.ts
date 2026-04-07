import type { Handler } from "@netlify/functions";
import { parseFreePriceText } from "../../shared/parser/parser";
import { badRequest, ok, serverError } from "./_lib/response";

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    if (!body.rawText) {
      return badRequest("rawText es obligatorio");
    }
    return ok(parseFreePriceText(body.rawText));
  } catch (error) {
    return serverError(error);
  }
};
