import { toPng } from "html-to-image";
import { createExportClone } from "./exportCapture";

export async function exportNodeAsImage(node: HTMLElement, filename: string) {
  const { node: exportNode, cleanup } = createExportClone(node);

  try {
    const dataUrl = await toPng(exportNode, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#f8fafc"
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${filename}.png`;
    link.click();
  } finally {
    cleanup();
  }
}
