import { z } from "zod";

export const settingsUpdateSchema = z.object({
  providers: z.array(z.any()).optional(),
  pickupLocations: z.array(z.any()).optional(),
  parserAliases: z.array(z.any()).optional(),
  boxUnits: z.record(z.number()).optional()
});
