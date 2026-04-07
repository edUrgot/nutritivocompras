export function json(statusCode, body) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
    };
}
export function ok(body) {
    return json(200, body);
}
export function badRequest(message) {
    return json(400, { error: message });
}
export function serverError(error) {
    return json(500, { error: error instanceof Error ? error.message : "Unexpected server error" });
}
