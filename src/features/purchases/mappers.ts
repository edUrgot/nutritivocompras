import { CALIBERS_BY_ID } from "@shared/constants/calibers";
import type { ParsedPriceLine } from "@shared/types/parser";
import { buildEmptyLines } from "./defaults";
import { calculateLine } from "./calculations";

export function mergeParsedLines(parsedLines: ParsedPriceLine[]) {
  const lines = buildEmptyLines();
  return lines.map((line) => {
    const parsed = parsedLines.find((entry) => entry.caliberId === line.caliberId);
    if (!parsed) return line;
    const caliber = CALIBERS_BY_ID[line.caliberId];
    return calculateLine({
      ...line,
      caliberName: caliber.name,
      unitPrice: parsed.unitPrice ?? 0,
      parserConfidence: parsed.confidence,
      parserRawLabel: parsed.rawLabel
    });
  });
}
