import { apiClient } from "@/lib/apiClient";

export const compareApi = {
  getCompare: apiClient.getCompare,
  saveLatestPrice: apiClient.saveLatestPrice
};
