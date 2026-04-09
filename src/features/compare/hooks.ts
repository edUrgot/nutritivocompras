import { useMutation, useQuery } from "@tanstack/react-query";
import { compareApi } from "./api";
import { queryClient } from "@/lib/queryClient";

export function useCompareData() {
  return useQuery({ queryKey: ["compare"], queryFn: compareApi.getCompare });
}

export function useSaveLatestPrice() {
  return useMutation({
    mutationFn: compareApi.saveLatestPrice,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["compare"] }),
        queryClient.invalidateQueries({ queryKey: ["latest-prices"] })
      ]);
    }
  });
}
