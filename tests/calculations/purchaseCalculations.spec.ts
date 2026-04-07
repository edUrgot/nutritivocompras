import { buildSummary, calculateLine } from "../../src/features/purchases/calculations";

describe("purchase calculations", () => {
  it("recalcula total unidades y subtotal por línea", () => {
    const line = calculateLine({
      lineId: "1",
      caliberId: "segunda-blanco",
      caliberName: "Segunda Blanco",
      category: "blanco",
      unitPrice: 205,
      boxes: 2,
      unitsPerBox: 180,
      totalUnits: 0,
      subtotal: 0
    });
    expect(line.totalUnits).toBe(360);
    expect(line.subtotal).toBe(73800);
  });

  it("construye totales del resumen", () => {
    const summary = buildSummary(
      {
        supplierId: "test",
        supplierName: "Proveedor Test",
        documentNumber: "NC-1",
        purchaseDate: "2026-04-05",
        responsibleName: "Luis",
        authorizerName: "Carlos",
        deliveryMode: "retiro",
        addressText: "Dirección",
        paymentMethod: "Transferencia",
        notes: ""
      },
      [
        {
          lineId: "1",
          caliberId: "segunda-blanco",
          caliberName: "Segunda Blanco",
          category: "blanco",
          unitPrice: 205,
          boxes: 2,
          unitsPerBox: 180,
          totalUnits: 0,
          subtotal: 0
        }
      ]
    );
    expect(summary.totalBoxes).toBe(2);
    expect(summary.totalUnits).toBe(360);
    expect(summary.grandTotal).toBe(73800);
  });
});
