import { parseFreePriceText } from "../../shared/parser/parser";

describe("parseFreePriceText", () => {
  it("interpreta aliases compactos", () => {
    const result = parseFreePriceText("Sb260 exb242 lb222 llb190 sc265 exc245 lc225 llc190 jb305 jc310");
    expect(result.parsedLines.find((line) => line.caliberId === "super-blanco")?.unitPrice).toBe(260);
    expect(result.parsedLines.find((line) => line.caliberId === "extra-blanco")?.unitPrice).toBe(242);
    expect(result.parsedLines.find((line) => line.caliberId === "super-color")?.unitPrice).toBe(265);
    expect(result.parsedLines.find((line) => line.caliberId === "jumbo-blanco")?.unitPrice).toBe(305);
    expect(result.parsedLines.find((line) => line.caliberId === "jumbo-color")?.unitPrice).toBe(310);
  });

  it("interpreta palabras sin color como blanco", () => {
    const result = parseFreePriceText("Segunda 205 Primera 225 Extra 150 Super 190");
    expect(result.parsedLines.find((line) => line.caliberId === "segunda-blanco")?.unitPrice).toBe(205);
    expect(result.parsedLines.find((line) => line.caliberId === "primera-blanco")?.unitPrice).toBe(225);
    expect(result.parsedLines.find((line) => line.caliberId === "super-blanco")?.unitPrice).toBe(190);
  });

  it("soporta faltantes", () => {
    const result = parseFreePriceText("Precios JB 270 SB 265 EB 230 IB 205 IIB xx");
    expect(result.parsedLines.find((line) => line.caliberId === "segunda-blanco")?.status).toBe("missing");
  });

  it("interpreta jumbo s/color y atajos color", () => {
    const result = parseFreePriceText("Precios 01/04/25 Super 255 Extra 235 Primera 210 Segunda 190 Jumbo S/color 270 E/color 250 I/color 235");
    expect(result.parsedLines.find((line) => line.caliberId === "jumbo-color")?.unitPrice).toBe(270);
    expect(result.parsedLines.find((line) => line.caliberId === "extra-color")?.unitPrice).toBe(250);
    expect(result.parsedLines.find((line) => line.caliberId === "primera-color")?.unitPrice).toBe(235);
    expect(result.parsedLines.find((line) => line.caliberId === "super-blanco")?.unitPrice).toBe(255);
  });
});
