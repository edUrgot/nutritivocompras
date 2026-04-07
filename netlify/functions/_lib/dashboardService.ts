import type { SheetsRepository } from "./sheetsRepository";

export async function getDashboardPayload(repository: SheetsRepository) {
  return repository.getDashboardData();
}
