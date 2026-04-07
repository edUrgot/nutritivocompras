import type { HandlerResponse } from "@netlify/functions";

export function json(statusCode: number, body: unknown): HandlerResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}

export function ok(body: unknown) {
  return json(200, body);
}

export function badRequest(message: string) {
  return json(400, { error: message });
}

export function serverError(error: unknown) {
  return json(500, { error: error instanceof Error ? error.message : "Unexpected server error" });
}
