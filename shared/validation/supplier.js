import { z } from "zod";
export const supplierSchema = z.object({
    supplierName: z.string().trim().min(2, "El nombre del proveedor es obligatorio")
});
