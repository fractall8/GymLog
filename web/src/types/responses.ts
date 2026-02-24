export interface LoginApiErrorResponse {
    error?: string;
    message?: string;
}

export interface RegisterApiErrorResponse {
    errors?: string[];
    message?: string;
}

export interface ValidationApiErrorResponse {
    errors: Record<string, string[]>;
    title: string;
}