import type { Supplier } from "@shared/types/supplier";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface SupplierSelectorProps {
  suppliers: Supplier[];
  supplierId: string;
  customSupplierName: string;
  onSupplierChange: (value: string) => void;
  onCustomNameChange: (value: string) => void;
}

export function SupplierSelector({
  suppliers,
  supplierId,
  customSupplierName,
  onSupplierChange,
  onCustomNameChange
}: SupplierSelectorProps) {
  const selected = suppliers.find((supplier) => supplier.id === supplierId);
  const isOther = selected?.supplierType === "other" || supplierId === "otro";

  return (
    <div className="grid gap-3">
      <Select value={supplierId} onChange={(event) => onSupplierChange(event.target.value)}>
        <option value="">Selecciona un proveedor</option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </Select>
      {isOther ? (
        <Input
          value={customSupplierName}
          onChange={(event) => onCustomNameChange(event.target.value)}
          placeholder="Escribe el nombre del proveedor"
        />
      ) : null}
    </div>
  );
}
