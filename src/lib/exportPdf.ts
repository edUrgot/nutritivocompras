import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

export async function exportNodeAsPdf(node: HTMLElement, filename: string) {
  const image = await toPng(node, { cacheBust: true, pixelRatio: 2 });
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(image, "PNG", 8, 8, 194, 280, undefined, "FAST");
  pdf.save(`${filename}.pdf`);
}
