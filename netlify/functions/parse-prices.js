import { parseFreePriceText } from "../../shared/parser/parser";
import { badRequest, ok, serverError } from "./_lib/response";
export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        if (!body.rawText) {
            return badRequest("rawText es obligatorio");
        }
        return ok(parseFreePriceText(body.rawText));
    }
    catch (error) {
        return serverError(error);
    }
};
