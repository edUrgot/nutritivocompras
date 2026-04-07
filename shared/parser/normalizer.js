export function normalizeText(input) {
    return input
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .replace(/S\/COLOR/g, " S COLOR ")
        .replace(/E\/COLOR/g, " E COLOR ")
        .replace(/I\/COLOR/g, " I COLOR ")
        .replace(/,/g, " ")
        .replace(/:/g, " ")
        .replace(/;/g, " ")
        .replace(/([A-Z]{1,6})(\d+(?:[.,]\d+)?)/g, "$1 $2")
        .replace(/\s+/g, " ")
        .trim();
}
