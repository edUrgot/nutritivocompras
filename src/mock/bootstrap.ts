import { BRAND } from "@shared/constants/brand";
import { CALIBERS } from "@shared/constants/calibers";
import { PREDEFINED_SUPPLIERS } from "@shared/constants/suppliers";
import { PARSER_ALIASES } from "@shared/parser/aliases";
import type { BootstrapPayload } from "@shared/types/purchase";

export const mockBootstrap: BootstrapPayload = {
  suppliers: PREDEFINED_SUPPLIERS.map((supplier) => ({
    id: supplier.id,
    name: supplier.name,
    supplierType: supplier.type === "other" ? "other" : "predefined",
    isPredefined: supplier.type !== "other",
    isActive: true
  })),
  pickupLocations: [
    {
      id: "loc-sf-1",
      supplierId: "comercial-sin-frontera",
      supplierName: "Comercial Sin Frontera",
      label: "Bodega Comercial Sin Frontera",
      addressLine: "Nueva Rengifo 271, Recoleta",
      isActive: true
    },
    {
      id: "loc-sm-1",
      supplierId: "comercial-santa-minerva",
      supplierName: "Comercial Santa Minerva",
      label: "Punto de retiro Santa Minerva",
      addressLine: "Berna 6775, La Cisterna",
      isActive: true
    }
  ],
  calibers: CALIBERS,
  parserAliases: PARSER_ALIASES.map((entry, index) => ({
    alias: entry.alias,
    normalizedAlias: entry.alias,
    caliberId: entry.caliberId,
    category: entry.caliberId.includes("color") ? "color" : "blanco",
    priority: 100 - index
  })),
  branding: {
    appName: BRAND.appName,
    subtitle: BRAND.subtitle,
    colors: { ...BRAND.colors }
  },
  appSettings: {
    currency: "CLP",
    documentPrefix: "C"
  }
};
