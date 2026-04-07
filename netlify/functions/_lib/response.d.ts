import type { HandlerResponse } from "@netlify/functions";
export declare function json(statusCode: number, body: unknown): HandlerResponse;
export declare function ok(body: unknown): HandlerResponse;
export declare function badRequest(message: string): HandlerResponse;
export declare function serverError(error: unknown): HandlerResponse;
