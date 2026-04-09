import { useMutation, useQuery } from "@tanstack/react-query";
import { purchasesApi } from "./api";
import { queryClient } from "@/lib/queryClient";

export function useBootstrap() {
  return useQuery({ queryKey: ["bootstrap"], queryFn: purchasesApi.getBootstrap });
}

export function useLatestPrices(supplierId?: string) {
  return useQuery({
    queryKey: ["latest-prices", supplierId],
    queryFn: () => purchasesApi.getLatestPrices(supplierId),
    enabled: Boolean(supplierId)
  });
}

export function useNextDocumentNumber(purchaseDate?: string) {
  return useQuery({
    queryKey: ["next-document-number", purchaseDate],
    queryFn: () => purchasesApi.getNextDocumentNumber(purchaseDate || ""),
    enabled: Boolean(purchaseDate)
  });
}

export function useParsePrices() {
  return useMutation({
    mutationFn: ({ rawText, supplierId }: { rawText: string; supplierId?: string }) => purchasesApi.parsePrices(rawText, supplierId)
  });
}

export function useSavePurchase() {
  return useMutation({
    mutationFn: purchasesApi.savePurchase,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["latest-prices"] }),
        queryClient.invalidateQueries({ queryKey: ["compare"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      ]);
    }
  });
}
