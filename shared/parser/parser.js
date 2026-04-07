import { CALIBERS_BY_ID } from "../constants/calibers";
import { PARSER_ALIASES } from "./aliases";
import { normalizeText } from "./normalizer";
import { tokenize } from "./tokenizer";
const missingTokens = new Set(["XX", "X", "-", "--"]);
const maxAliasTokens = Math.max(...PARSER_ALIASES.map((entry) => entry.alias.split(" ").length));
function isNumericToken(token) {
    return /^\d+(?:[.,]\d+)?$/.test(token);
}
function parseNumericToken(token) {
    return Number(token.replace(/\./g, "").replace(",", "."));
}
export function parseFreePriceText(rawText) {
    const normalized = normalizeText(rawText);
    const tokens = tokenize(normalized);
    const aliasMap = new Map(PARSER_ALIASES.map((entry) => [entry.alias, entry.caliberId]));
    const results = new Map();
    const warnings = [];
    for (let index = 0; index < tokens.length; index += 1) {
        let matchedAlias = "";
        let matchedCaliberId = "";
        let consumed = 0;
        for (let size = Math.min(maxAliasTokens, tokens.length - index); size >= 1; size -= 1) {
            const candidate = tokens.slice(index, index + size).join(" ");
            const caliberId = aliasMap.get(candidate);
            if (caliberId) {
                matchedAlias = candidate;
                matchedCaliberId = caliberId;
                consumed = size;
                break;
            }
        }
        const match = matchedCaliberId;
        if (!match) {
            continue;
        }
        const caliber = CALIBERS_BY_ID[match];
        if (!caliber) {
            continue;
        }
        const priceToken = tokens[index + consumed];
        if (!priceToken) {
            results.set(caliber.id, {
                caliberId: caliber.id,
                caliberName: caliber.name,
                category: caliber.category,
                unitPrice: null,
                status: "missing",
                confidence: 0.4,
                rawLabel: matchedAlias
            });
            index += consumed - 1;
            continue;
        }
        if (missingTokens.has(priceToken)) {
            results.set(caliber.id, {
                caliberId: caliber.id,
                caliberName: caliber.name,
                category: caliber.category,
                unitPrice: null,
                status: "missing",
                confidence: 0.7,
                rawLabel: matchedAlias
            });
            index += consumed;
            continue;
        }
        if (isNumericToken(priceToken)) {
            results.set(caliber.id, {
                caliberId: caliber.id,
                caliberName: caliber.name,
                category: caliber.category,
                unitPrice: parseNumericToken(priceToken),
                status: "interpreted",
                confidence: consumed > 1 ? 0.95 : 0.9,
                rawLabel: matchedAlias
            });
            index += consumed;
            continue;
        }
        warnings.push(`No se pudo interpretar el valor para ${matchedAlias}.`);
        results.set(caliber.id, {
            caliberId: caliber.id,
            caliberName: caliber.name,
            category: caliber.category,
            unitPrice: null,
            status: "review",
            confidence: 0.3,
            rawLabel: matchedAlias
        });
        index += consumed - 1;
    }
    return {
        parsedLines: Array.from(results.values()),
        warnings
    };
}
