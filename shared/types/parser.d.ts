import type { CaliberCategory } from "../constants/calibers";
export type ParsedLineStatus = "interpreted" | "missing" | "review";
export interface ParsedPriceLine {
    caliberId: string;
    caliberName: string;
    category: CaliberCategory;
    unitPrice: number | null;
    status: ParsedLineStatus;
    confidence: number;
    rawLabel: string;
}
export interface ParseResult {
    parsedLines: ParsedPriceLine[];
    warnings: string[];
}
