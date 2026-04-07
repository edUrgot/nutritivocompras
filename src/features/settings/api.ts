import { apiClient } from "@/lib/apiClient";

export const settingsApi = {
  saveSettings: apiClient.saveSettings,
  saveProvider: apiClient.saveProvider
};
