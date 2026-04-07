import type { SheetsRepository } from "./sheetsRepository";
export declare function getBootstrapPayload(repository: SheetsRepository): Promise<{
    suppliers: import("../../../shared/types/supplier").Supplier[] | {
        id: string;
        name: string;
        supplierType: string;
        isPredefined: boolean;
        isActive: boolean;
        notes: string;
    }[];
    pickupLocations: {
        id: string;
        supplierId: string;
        supplierName: string;
        label: string;
        addressLine: string;
        isActive: boolean;
    }[];
    calibers: import("../../../shared/constants/calibers").CaliberDefinition[];
    parserAliases: {
        alias: string;
        normalizedAlias: string;
        caliberId: string;
        category: string;
        priority: number;
    }[];
    branding: {
        readonly appName: "Compras Nutritivo Chile";
        readonly subtitle: "Resumen comercial";
        readonly colors: {
            readonly primary: "#16345d";
            readonly secondary: "#4e82d7";
            readonly accent: "#ecb71e";
            readonly surface: "#f5f7fb";
            readonly text: "#1b2430";
        };
    };
    appSettings: {
        [k: string]: string;
    };
} | {
    suppliers: {
        id: string;
        name: string;
        supplierType: "other" | "predefined";
        isPredefined: boolean;
        isActive: true;
    }[];
    pickupLocations: any[];
    calibers: import("../../../shared/constants/calibers").CaliberDefinition[];
    parserAliases: {
        alias: string;
        normalizedAlias: string;
        caliberId: string;
        category: string;
        priority: number;
    }[];
    branding: {
        readonly appName: "Compras Nutritivo Chile";
        readonly subtitle: "Resumen comercial";
        readonly colors: {
            readonly primary: "#16345d";
            readonly secondary: "#4e82d7";
            readonly accent: "#ecb71e";
            readonly surface: "#f5f7fb";
            readonly text: "#1b2430";
        };
    };
    appSettings: {
        currency: string;
        documentPrefix: string;
    };
}>;
