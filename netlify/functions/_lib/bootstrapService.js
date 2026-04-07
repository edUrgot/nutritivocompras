import { BRAND } from "../../../shared/constants/brand";
import { CALIBERS } from "../../../shared/constants/calibers";
import { PREDEFINED_SUPPLIERS } from "../../../shared/constants/suppliers";
import { PARSER_ALIASES } from "../../../shared/parser/aliases";
export async function getBootstrapPayload(repository) {
    const bootstrap = await repository.getBootstrapData();
    return (bootstrap ?? {
        suppliers: PREDEFINED_SUPPLIERS.map((supplier) => ({
            id: supplier.id,
            name: supplier.name,
            supplierType: supplier.type === "other" ? "other" : "predefined",
            isPredefined: supplier.type !== "other",
            isActive: true
        })),
        pickupLocations: [],
        calibers: CALIBERS,
        parserAliases: PARSER_ALIASES.map((entry, index) => ({
            alias: entry.alias,
            normalizedAlias: entry.alias,
            caliberId: entry.caliberId,
            category: entry.caliberId.includes("color") ? "color" : "blanco",
            priority: 100 - index
        })),
        branding: BRAND,
        appSettings: {
            currency: "CLP",
            documentPrefix: "C"
        }
    });
}
