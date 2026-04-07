export interface DashboardFilters {
  from?: string;
  to?: string;
  supplierIds?: string[];
  caliberIds?: string[];
}

export interface DashboardKpi {
  label: string;
  value: string;
  note?: string;
}

export interface DashboardSeriesPoint {
  label: string;
  value: number;
  supplier?: string;
  caliber?: string;
}

export interface DashboardPayload {
  kpis: DashboardKpi[];
  spendTrend: DashboardSeriesPoint[];
  supplierShare: DashboardSeriesPoint[];
  caliberShare: DashboardSeriesPoint[];
  avgPriceTrend: DashboardSeriesPoint[];
}
