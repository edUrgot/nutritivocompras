import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { useBootstrap } from "@/features/purchases/hooks";
import { BoxUnitsSettings } from "@/features/settings/BoxUnitsSettings";
import { LocationsSettings } from "@/features/settings/LocationsSettings";
import { ParserAliasesSettings } from "@/features/settings/ParserAliasesSettings";
import { ProvidersSettings } from "@/features/settings/ProvidersSettings";

export function SettingsPage() {
  const { data } = useBootstrap();

  return (
    <div className="space-y-6">
      <PageHeader title="Configuración" description="Gestiona proveedores, direcciones, aliases del parser y parámetros base sin tocar el código." />
      {!data ? (
        <EmptyState title="Sin configuración" description="No pudimos cargar la configuración base. Revisa la conexión con bootstrap." />
      ) : (
        <div className="grid gap-6">
          <ProvidersSettings suppliers={data.suppliers} />
          <LocationsSettings locations={data.pickupLocations} />
          <ParserAliasesSettings />
          <BoxUnitsSettings />
        </div>
      )}
    </div>
  );
}
