import { useMutation } from "@tanstack/react-query";
import { settingsApi } from "./api";

export function useSaveSettings() {
  return useMutation({ mutationFn: settingsApi.saveSettings });
}

export function useCreateProvider() {
  return useMutation({ mutationFn: settingsApi.saveProvider });
}
