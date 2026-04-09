export { formatCurrency } from "./currency";

export function formatNumber(value: number) {
  return new Intl.NumberFormat("es-CL").format(Number.isFinite(value) ? value : 0);
}

export function formatDateTime(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
