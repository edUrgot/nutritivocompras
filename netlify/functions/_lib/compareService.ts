import type { SheetsRepository } from "./sheetsRepository";

export async function getComparePayload(repository: SheetsRepository) {
  return repository.getCompareData();
}
