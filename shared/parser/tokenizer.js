export function tokenize(text) {
    return text
        .split(/\s+/)
        .map((token) => token.trim())
        .filter(Boolean);
}
