import type { Handler } from "@netlify/functions";
import { supplierSchema } from "../../shared/validation/supplier";
import { readEnv } from "./_lib/env";
import { ok, serverError } from "./_lib/response";
import { SheetsRepository } from "./_lib/sheetsRepository";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const handler: Handler = async (event) => {
  try {
    const repository = new SheetsRepository(readEnv());
    const parsed = supplierSchema.parse(JSON.parse(event.body || "{}"));
    const supplier = {
      id: slugify(parsed.supplierName),
      name: parsed.supplierName,
      supplierType: "custom" as const,
      isPredefined: false,
      isActive: true
    };
    await repository.upsertProvider(supplier);
    return ok({ supplier });
  } catch (error) {
    return serverError(error);
  }
};
