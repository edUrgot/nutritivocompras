import { z } from "zod";

export const purchaseLineSchema = z.object({
  lineId: z.string(),
  caliberId: z.string(),
  caliberName: z.string(),
  category: z.enum(["blanco", "color"]),
  unitPrice: z.number().min(0),
  boxes: z.number().min(0),
  unitsPerBox: z.number().min(0),
  totalUnits: z.number().min(0),
  subtotal: z.number().min(0),
  parserConfidence: z.number().optional(),
  parserRawLabel: z.string().optional()
});

export const purchaseHeaderSchema = z
  .object({
    supplierId: z.string().min(1),
    supplierName: z.string().min(1),
    customSupplierName: z.string().optional(),
    documentNumber: z.string(),
    purchaseDate: z.string().min(1),
    responsibleName: z.string().min(1),
    authorizerName: z.string().min(1),
    deliveryMode: z.enum(["retiro", "despacho"]),
    pickupLocationId: z.string().optional(),
    pickupLocationLabel: z.string().optional(),
    addressText: z.string().min(1),
    paymentMethod: z.string().min(1),
    notes: z.string().optional().default("")
  })
  .superRefine((value, ctx) => {
    if (value.supplierId === "otro" && !value.customSupplierName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customSupplierName"],
        message: "Debes escribir un nombre real para el proveedor cuando eliges Otro."
      });
    }
  });

export const purchasePayloadSchema = z.object({
  header: purchaseHeaderSchema,
  lines: z.array(purchaseLineSchema).min(1)
});
