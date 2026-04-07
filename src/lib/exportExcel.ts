import ExcelJS from "exceljs";
import type { PurchaseSummary } from "@shared/types/purchase";
import { formatCurrency } from "./currency";

export async function exportPurchaseAsExcel(summary: PurchaseSummary, filename: string) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Nutritivo Chile";
  workbook.created = new Date();

  const summarySheet = workbook.addWorksheet("Resumen");
  summarySheet.columns = [
    { header: "Campo", key: "field", width: 28 },
    { header: "Valor", key: "value", width: 38 }
  ];
  summarySheet.addRow({ field: "Documento", value: summary.header.documentNumber });
  summarySheet.addRow({ field: "Proveedor", value: summary.header.supplierName });
  summarySheet.addRow({ field: "Fecha", value: summary.header.purchaseDate });
  summarySheet.addRow({ field: "Responsable", value: summary.header.responsibleName });
  summarySheet.addRow({ field: "Quién autoriza", value: summary.header.authorizerName });
  summarySheet.addRow({ field: "Modalidad", value: summary.header.deliveryMode });
  summarySheet.addRow({ field: "Dirección", value: summary.header.addressText });
  summarySheet.addRow({ field: "Forma de pago", value: summary.header.paymentMethod });
  summarySheet.addRow({ field: "Total cajas", value: summary.totalBoxes });
  summarySheet.addRow({ field: "Total unidades", value: summary.totalUnits });
  summarySheet.addRow({ field: "Promedio por huevo", value: formatCurrency(summary.avgPricePerEgg) });
  summarySheet.addRow({ field: "Total general", value: formatCurrency(summary.grandTotal) });
  summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  summarySheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF16345D" } };

  const detailSheet = workbook.addWorksheet("Detalle");
  detailSheet.columns = [
    { header: "Calibre", key: "caliber", width: 24 },
    { header: "Categoría", key: "category", width: 14 },
    { header: "Precio unitario", key: "unitPrice", width: 18 },
    { header: "Cajas", key: "boxes", width: 12 },
    { header: "Unidades por caja", key: "unitsPerBox", width: 18 },
    { header: "Total unidades", key: "totalUnits", width: 18 },
    { header: "Subtotal", key: "subtotal", width: 18 }
  ];
  summary.lines.forEach((line) => {
    detailSheet.addRow({
      caliber: line.caliberName,
      category: line.category,
      unitPrice: line.unitPrice,
      boxes: line.boxes,
      unitsPerBox: line.unitsPerBox,
      totalUnits: line.totalUnits,
      subtotal: line.subtotal
    });
  });
  detailSheet.addRow({
    caliber: "TOTAL",
    unitPrice: summary.avgPricePerEgg,
    boxes: summary.totalBoxes,
    totalUnits: summary.totalUnits,
    subtotal: summary.grandTotal
  });
  detailSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  detailSheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF4E82D7" } };
  const totalRow = detailSheet.getRow(detailSheet.rowCount);
  totalRow.font = { bold: true };
  totalRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECB71E" } };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
}
