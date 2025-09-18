import { MakeHttpRequestParams } from "@/native/types";
// import router from "./router";
// import { toast } from "sonner";

const fetch = async <T = any>(params: MakeHttpRequestParams) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const result = await window.nativeAPI.makeHttpRequest<T>({
        ...params,
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...params.headers,
        }
    });

    if (result.error) {
        // switch (result.status) {
        //     case 401:
        //         router.navigate({ to: "/auth/login" });
        //         break;
        //     default:
        //         toast.error(result.error.message || 'An error occurred');
        //         break;
        // }
        throw result.error;
    }

    return result.response!.data;
};

export default fetch;