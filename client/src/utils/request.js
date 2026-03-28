const ALLOWED_METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);

export class HttpError extends Error {
    constructor(status, message, body = undefined) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.body = body;
    }
}

function assertAllowedMethod(method) {
    const normalized = String(method).toUpperCase();
    if (!ALLOWED_METHODS.has(normalized)) {
        throw new Error(
            `Invalid HTTP method "${method}". Allowed: ${[...ALLOWED_METHODS].join(", ")}`
        );
    }
    return normalized;
}

function assertValidUrl(url) {
    if (typeof url !== "string" || url.trim() === "") {
        throw new Error("Request URL must be a non-empty string.");
    }
}

function messageFromErrorBody(body) {
    if (body == null) return null;
    if (typeof body.message === "string") return body.message;
    if (typeof body.error === "string") return body.error;
    return null;
}

const request = async (method, url, data, options = {}) => {
    const normalizedMethod = assertAllowedMethod(method);
    assertValidUrl(url);

    if (normalizedMethod === "GET" && data) {
        throw new Error("GET requests cannot include a body; use query parameters on the URL.");
    }

    if (normalizedMethod !== "GET") {
        options.method = normalizedMethod;
    }

    if (data) {
        options = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(data),
        };
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get("Content-Type") ?? "";
    const text = await response.text();
    const trimmed = text.trim();

    if (!response.ok) {
        const isJson =
            contentType.includes("application/json") ||
            trimmed.startsWith("{") ||
            trimmed.startsWith("[");

        let parsedBody;
        if (trimmed && isJson) {
            try {
                parsedBody = JSON.parse(text);
            } catch {
                parsedBody = undefined;
            }
        }

        const fromBody = messageFromErrorBody(parsedBody);
        const fallback =
            trimmed && !parsedBody
                ? trimmed
                : response.statusText || `Request failed (${response.status})`;

        throw new HttpError(
            response.status,
            fromBody || fallback,
            parsedBody !== undefined ? parsedBody : trimmed || undefined
        );
    }

    if (!trimmed) {
        return undefined;
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new HttpError(
            response.status,
            "Response body is not valid JSON.",
            text
        );
    }
};

export default {
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    delete: request.bind(null, "DELETE"),
    baseRequest: request,
};
