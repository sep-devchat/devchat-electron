import axios, { AxiosError } from "axios";
import { NativeAPIHandler } from "../types";
import { MakeHttpRequestArgs, MakeHttpRequestResult } from "../types";

const makeHttpRequest: NativeAPIHandler = async (_event, args: MakeHttpRequestArgs): Promise<MakeHttpRequestResult> => {
    const {
        url,
        method = 'GET',
        headers = {},
        query = {},
        body,
        timeoutMs = 15000,
        responseType = 'json'
    } = args || {} as MakeHttpRequestArgs;

    if (!url) {
        return { ok: false, error: 'Missing url' };
    }

    try {
        const response = await axios.request({
            url,
            method: method as any,
            headers,
            params: query,
            data: body,
            timeout: timeoutMs,
            responseType: responseType === 'arraybuffer' ? 'arraybuffer' : responseType === 'text' ? 'text' : 'json',
            // Prevent axios from throwing on status codes so we can unify handling
            validateStatus: () => true
        });

        const normHeaders: Record<string, string> = {};
        for (const [k, v] of Object.entries(response.headers || {})) {
            if (Array.isArray(v)) normHeaders[k] = v.join(', '); else if (v != null) normHeaders[k] = String(v);
        }

        const ok = response.status >= 200 && response.status < 300;
        if (ok) {
            return {
                ok: true,
                status: response.status,
                statusText: response.statusText,
                headers: normHeaders,
                data: response.data
            };
        } else {
            return {
                ok: false,
                status: response.status,
                statusText: response.statusText,
                headers: normHeaders,
                error: 'HTTP_ERROR',
                data: response.data
            };
        }
    } catch (e) {
        const err = e as AxiosError;
        let status: number | undefined;
        let statusText: string | undefined;
        let headers: Record<string, string> | undefined;
        let data: any = undefined;
        if (err.response) {
            status = err.response.status;
            statusText = err.response.statusText;
            headers = {};
            for (const [k, v] of Object.entries(err.response.headers || {})) {
                if (Array.isArray(v)) headers[k] = v.join(', '); else if (v != null) headers[k] = String(v);
            }
            data = err.response.data;
        }
        return {
            ok: false,
            status,
            statusText,
            headers,
            error: err.message || 'REQUEST_FAILED',
            data
        };
    }
};

export default makeHttpRequest;