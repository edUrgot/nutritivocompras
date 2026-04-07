import { apiClient } from "@/lib/apiClient";

export const purchasesApi = {
  getBootstrap: apiClient.getBootstrap,
  parsePrices: apiClient.parsePrices,
  getLatestPrices: apiClient.getLatestPrices,
  getNextDocumentNumber: apiClient.getNextDocumentNumber,
  savePurchase: apiClient.savePurchase
};
