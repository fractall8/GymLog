
export class ApiError<T = unknown> extends Error {
    response?: {
        status: number;
        data?: T;
    };

    constructor(status: number, data: T) {
        super("API Error");
        this.response = { status, data };
    }
}

// Move to .env
const baseURL = 'http://localhost:8080';

async function fetchWrapper(endpoint: string, options: RequestInit = {}) {
    const url = `${baseURL}${endpoint}`;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
        credentials: 'include',
    };

    const response = await fetch(url, config);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        throw new ApiError(response.status, data);
    }

    return { data };
}

const api = {
    get: (url: string, options?: RequestInit) =>
        fetchWrapper(url, { ...options, method: 'GET' }),

    post: (url: string, body?: unknown, options?: RequestInit) =>
        fetchWrapper(url, { ...options, method: 'POST', body: JSON.stringify(body) }),

    put: (url: string, body?: unknown, options?: RequestInit) =>
        fetchWrapper(url, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    patch: (url: string, body?: unknown, options?: RequestInit) =>
        fetchWrapper(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

    delete: (url: string, options?: RequestInit) =>
        fetchWrapper(url, { ...options, method: 'DELETE' }),
};

export default api;