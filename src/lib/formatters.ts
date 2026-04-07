export { formatCurrency } from "./currency";

export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CL").format(Number.isFinite(value) ? value : 0);
}
