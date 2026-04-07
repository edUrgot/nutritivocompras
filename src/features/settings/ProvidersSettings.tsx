import { useState } from "react";
import type { Supplier } from "@shared/types/supplier";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { useCreateProvider } from "./hooks";

export function ProvidersSettings({ suppliers }: { suppliers: Supplier[] }) {
  const [name, setName] = useState("");
  const createProvider = useCreateProvider();

  async function handleCreate() {
    if (!name.trim()) return;
    await createProvider.mutateAsync(name.trim());
    setName("");
  }

  return (
    <SectionCard>
      <h3 className="text-xl font-bold text-brand-900">Proveedores</h3>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Agregar proveedor nuevo" />
        <Button type="button" onClick={handleCreate} disabled={createProvider.isPending}>
          {createProvider.isPending ? "Guardando..." : "Guardar proveedor"}
        </Button>
      </div>
      {createProvider.isSuccess ? <p className="mt-3 text-sm text-emerald-700">Proveedor enviado al backend.</p> : null}
      <ul className="mt-4 space-y-2">
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
            {supplier.name}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
