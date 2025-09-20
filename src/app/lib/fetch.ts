import { MakeHttpRequestParams } from "@/native/types";
import router from "./router";
import { TokenResponse } from "./services/auth/types";

let refreshingPromise: Promise<TokenResponse | null> | null = null;

async function performRequest<T>(params: MakeHttpRequestParams, accessToken?: string) {
    return await window.nativeAPI.makeHttpRequest<T>({
        ...params,
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...params.headers,
        },
    });
}

async function refreshTokens(): Promise<TokenResponse | null> {
    let currentRefresh: string | null = null;
    try {
        currentRefresh = await window.nativeAPI.getRefreshToken();
    } catch {
        currentRefresh = null;
    }
    if (!currentRefresh) return null;

    try {
        const result = await window.nativeAPI.makeHttpRequest<TokenResponse>({
            url: "/api/auth/refresh",
            method: "POST",
            body: { refreshToken: currentRefresh },
        });
        if (result.error || !result.response?.data) return null;
        const tokenSet = result.response.data;
        window.localStorage.setItem("accessToken", tokenSet.accessToken);
        // Persist refresh token securely via native API (encrypted)
        await window.nativeAPI.storeRefreshToken(tokenSet.refreshToken);
        return tokenSet;
    } catch {
        return null;
    }
}

const fetch = async <T = any>(params: MakeHttpRequestParams, attempt: number = 0): Promise<T> => {
    const accessToken = window.localStorage.getItem("accessToken") || undefined;
    const result = await performRequest<T>(params, accessToken);

    if (result.error) {
        if (result.status === 401 && attempt === 0) {
            if (!refreshingPromise) {
                refreshingPromise = refreshTokens().finally(() => {
                    refreshingPromise = null;
                });
            }
            const tokenSet = await refreshingPromise;
            if (tokenSet?.accessToken) {
                return await fetch<T>(params, attempt + 1);
            }
            // Refresh failed: clear tokens & redirect to login
            window.localStorage.removeItem("accessToken");
            // Clear secure refresh token by storing empty string
            try { await window.nativeAPI.storeRefreshToken(""); } catch { }
            router.navigate({ to: "/auth/login" });
        }
        throw result.error;
    }

    return result.response!.data;
};

export default fetch;