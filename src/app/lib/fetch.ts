import { MakeHttpRequestParams } from "@/native/types";
import router from "./router";
const fetch = async <T = unknown>(
    params: MakeHttpRequestParams,
): Promise<T> => {
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
            window.localStorage.removeItem("accessToken");
            router.navigate({ to: "/auth/login" });
        }
        throw result.error;
    }

    return result.response?.data as T;
};

export default fetch;
