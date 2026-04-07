import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "./api";

export function useDashboardData() {
  return useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.getDashboard });
}
