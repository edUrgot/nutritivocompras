import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { createExportClone } from "./exportCapture";

export async function exportNodeAsPdf(node: HTMLElement, filename: string) {
  const { node: exportNode, cleanup } = createExportClone(node);

  try {
    const image = await toPng(exportNode, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#f8fafc"
    });

    const exportWidth = exportNode.offsetWidth;
    const exportHeight = exportNode.offsetHeight;
    const orientation = exportWidth >= exportHeight ? "l" : "p";
    const pdf = new jsPDF(orientation, "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;
    const scale = Math.min(usableWidth / exportWidth, usableHeight / exportHeight);
    const renderedWidth = exportWidth * scale;
    const renderedHeight = exportHeight * scale;
    const x = (pageWidth - renderedWidth) / 2;
    const y = (pageHeight - renderedHeight) / 2;

    pdf.addImage(image, "PNG", x, y, renderedWidth, renderedHeight, undefined, "FAST");
    pdf.save(`${filename}.pdf`);
  } finally {
    cleanup();
  }
}
