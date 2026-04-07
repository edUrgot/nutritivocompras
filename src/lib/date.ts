import { format } from "date-fns";

export function todayIso() {
  return format(new Date(), "yyyy-MM-dd");
}
