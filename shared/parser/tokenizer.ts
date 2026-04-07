export function tokenize(text: string) {
  return text
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}
