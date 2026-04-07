import { useQuery } from "@tanstack/react-query";
import { compareApi } from "./api";

export function useCompareData() {
  return useQuery({ queryKey: ["compare"], queryFn: compareApi.getCompare });
}
