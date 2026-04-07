import { z } from "zod";
export declare const settingsUpdateSchema: z.ZodObject<{
    providers: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    pickupLocations: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    parserAliases: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    boxUnits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    providers?: any[];
    pickupLocations?: any[];
    parserAliases?: any[];
    boxUnits?: Record<string, number>;
}, {
    providers?: any[];
    pickupLocations?: any[];
    parserAliases?: any[];
    boxUnits?: Record<string, number>;
}>;
