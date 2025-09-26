import { IpcMainInvokeEvent, safeStorage } from "electron";
import { ApiError, ApiResponseDto, MakeHttpRequestParams, MakeHttpRequestResult, NativeAPIHandler } from "../types";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../../store";

/**
 * We augment AxiosRequestConfig to mark internal retry/skip flags.
 */
declare module 'axios' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface AxiosRequestConfig {
        _retry?: boolean;
        _skipAuth?: boolean; // used for refresh token request to avoid infinite loop
    }
}

// In-memory access token (not persisted). Renderer typically sends the first request
// with Authorization header; we capture and reuse it. After a refresh we update it here
// so future requests automatically add the latest token even if renderer is stale.
let accessToken: string | null = null;
let refreshingPromise: Promise<string | null> | null = null;
let lastBaseUrl: string | undefined; // captured per request for refresh endpoint

// Single shared axios instance (baseURL set per request invocation)
const axiosInstance: AxiosInstance = axios.create({ timeout: 15000 });

/**
 * Safely load stored refresh token (encrypted).
 */
function getStoredRefreshToken(): string | null {
    try {
        const encrypted = store.get("user.refreshToken") as string | undefined;
        if (!encrypted) return null;
        return safeStorage.decryptString(Buffer.from(encrypted, "base64"));
    } catch {
        return null;
    }
}

/**
 * Persist refresh token securely.
 */
function storeRefreshToken(refresh: string) {
    try {
        const encrypted = safeStorage.encryptString(refresh);
        store.set("user.refreshToken", encrypted.toString("base64"));
    } catch {
        // ignore
    }
}

async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken || !lastBaseUrl) return null;

    try {
        // Use a plain axios call (NOT axiosInstance) to avoid interceptor recursion
        const response = await axios.post<ApiResponseDto<{ accessToken: string; refreshToken: string }>>(
            `/api/auth/refresh`,
            { refreshToken },
            { baseURL: lastBaseUrl, timeout: 15000, _skipAuth: true }
        );
        const tokenSet = response.data?.data;
        if (tokenSet?.accessToken) {
            accessToken = tokenSet.accessToken;
            if (tokenSet.refreshToken) {
                storeRefreshToken(tokenSet.refreshToken);
            }
            return accessToken;
        }
    } catch (err) {
        // swallow; will cause caller to handle logout / error path
    }
    return null;
}

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use((config) => {
    if (config._skipAuth) return config; // internal call (refresh)

    // Capture baseURL for potential refresh call
    if (config.baseURL) {
        lastBaseUrl = config.baseURL;
    }

    // If caller provided an Authorization header, capture token for reuse
    const providedAuth = (config.headers as any)?.Authorization || (config.headers as any)?.authorization;
    if (providedAuth && typeof providedAuth === 'string' && providedAuth.startsWith('Bearer ')) {
        const token = providedAuth.substring('Bearer '.length).trim();
        if (!accessToken) accessToken = token; // only set if we don't already have one
    }

    // Attach our latest token if no Authorization header present
    if (accessToken) {
        // AxiosRequestHeaders is a special class; to avoid type conflict we cast to any for dynamic assignment.
        const headers: any = config.headers ?? (config.headers = {} as any);
        if (!("Authorization" in headers) && !("authorization" in headers)) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }
    }
    return config;
});

// RESPONSE INTERCEPTOR (handles 401 and refresh logic)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const response = error.response;
        const originalRequest = error.config as AxiosRequestConfig;

        if (!response) {
            return Promise.reject(error);
        }

        if (response.status === 401 && !originalRequest._retry && !originalRequest._skipAuth) {
            originalRequest._retry = true;

            if (!refreshingPromise) {
                refreshingPromise = refreshAccessToken().finally(() => {
                    refreshingPromise = null;
                });
            }

            const newToken = await refreshingPromise;
            if (newToken) {
                originalRequest.headers = originalRequest.headers || {};
                (originalRequest.headers as any)["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } else {
                // Clear in-memory token so future attempts don't reuse stale token
                accessToken = null;
            }
        }

        return Promise.reject(error);
    }
);

const makeHttpRequest: NativeAPIHandler = async <T = any, E = any>(e: IpcMainInvokeEvent, params: MakeHttpRequestParams): Promise<MakeHttpRequestResult<T, E>> => {
    const appSettings = store.get("app")

    try {
        const response = await axiosInstance.request<ApiResponseDto<T>>({
            baseURL: appSettings.apiBaseUrl,
            url: params.url,
            method: params.method as any,
            data: params.body,
            headers: { ...params.headers },
        });

        return {
            ok: true,
            status: response.status,
            headers: Object.fromEntries(Object.entries(response.headers || {}).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)])),
            response: response.data,
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const headers = error.response?.headers as Record<string, string> | undefined;
            const data = error.response?.data as ApiError<E> | E | undefined;

            const apiError: ApiError<E> | E | undefined = data && (typeof (data as any)?.message === 'string' && 'code' in (data as any)
                ? (data as ApiError<E>)
                : ({
                    code: error.code || 'HTTP_ERROR',
                    message: (error.message || 'Request failed'),
                    detail: data as E,
                    status,
                } as ApiError<E>)
            );

            return {
                ok: false,
                status,
                headers: headers && Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v)])),
                error: apiError ?? ({
                    code: error.code || 'HTTP_ERROR',
                    message: error.message || 'Request failed',
                    detail: undefined as unknown as E,
                    status,
                } as ApiError<E>),
            };
        }

        return {
            ok: false,
            error: {
                code: 'UNKNOWN_ERROR',
                message: String(error),
                detail: undefined as unknown as E,
            } as ApiError<E>,
        };
    }
}

export default makeHttpRequest;