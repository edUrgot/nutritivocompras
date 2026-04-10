function forceExportLayout(root: HTMLElement) {
  root.querySelector<HTMLElement>("[data-summary-top-grid]")?.style.setProperty("grid-template-columns", "1.15fr 0.85fr");
  root.querySelector<HTMLElement>("[data-summary-bottom-grid]")?.style.setProperty("grid-template-columns", "1.3fr 0.7fr");
  root.querySelector<HTMLElement>("[data-summary-meta-grid]")?.style.setProperty("grid-template-columns", "repeat(2, minmax(0, 1fr))");
  root.querySelector<HTMLElement>("[data-summary-kpi-grid]")?.style.setProperty("grid-template-columns", "repeat(2, minmax(0, 1fr))");
  root.querySelector<HTMLElement>("[data-summary-signatures]")?.style.setProperty("grid-template-columns", "repeat(2, minmax(0, 1fr))");

  const mobileTable = root.querySelector<HTMLElement>("[data-summary-lines-mobile]");
  if (mobileTable) {
    mobileTable.style.display = "none";
  }

  const desktopTable = root.querySelector<HTMLElement>("[data-summary-lines-desktop]");
  if (desktopTable) {
    desktopTable.style.display = "table";
  }
}

export function createExportClone(node: HTMLElement, width = 1120) {
  const clone = node.cloneNode(true) as HTMLElement;
  const wrapper = document.createElement("div");

  wrapper.style.position = "fixed";
  wrapper.style.left = "-10000px";
  wrapper.style.top = "0";
  wrapper.style.width = `${width}px`;
  wrapper.style.padding = "24px";
  wrapper.style.background = "#f8fafc";
  wrapper.style.zIndex = "-1";

  clone.style.width = `${width}px`;
  clone.style.maxWidth = `${width}px`;
  clone.style.margin = "0";

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);
  forceExportLayout(clone);

  return {
    node: clone,
    cleanup: () => wrapper.remove()
  };
}
