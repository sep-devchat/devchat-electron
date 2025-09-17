import { IpcMainInvokeEvent } from "electron";
import { ApiError, ApiResponseDto, MakeHttpRequestParams, MakeHttpRequestResult } from "../types";
import axios from "axios";
import readSettings from "./read-settings";

const makeHttpRequest = async <T = any, E = any>(e: IpcMainInvokeEvent, params: MakeHttpRequestParams): Promise<MakeHttpRequestResult<T, E>> => {
    const appSettings = readSettings(e);

    try {
        const response = await axios<ApiResponseDto<T>>({
            baseURL: appSettings.apiBaseUrl,
            url: params.url,
            method: params.method,
            data: params.body,
            headers: { ...params.headers }
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

            // If server returns our ApiError shape, pass it through; otherwise wrap
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
        }
    }
}

export default makeHttpRequest;