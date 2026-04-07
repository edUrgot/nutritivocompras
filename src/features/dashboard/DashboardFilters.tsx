import { Input } from "@/components/ui/Input";

export function DashboardFilters() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Input type="date" />
      <Input type="date" />
      <Input placeholder="Proveedor o calibre" />
    </div>
  );
}
