import { MakeHttpRequestParams } from "@/native/types";
import router from "./router";

// Simplified fetch: refresh logic now handled by native axios interceptors.
// We only attach the current access token (if any) and surface errors.
const fetch = async <T = any>(params: MakeHttpRequestParams): Promise<T> => {
    const accessToken = window.localStorage.getItem("accessToken") || undefined;
    const result = await window.nativeAPI.makeHttpRequest<T>({
        ...params,
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...params.headers,
        },
    });

    if (result.error) {
        if (result.status === 401) {
            // Interceptor-side refresh already failed; ensure local tokens cleared and redirect.
            window.localStorage.removeItem("accessToken");
            try { await window.nativeAPI.storeRefreshToken(""); } catch { /* ignore */ }
            router.navigate({ to: "/auth/login" });
        }
        throw result.error;
    }

    return result.response!.data;
};

export default fetch;