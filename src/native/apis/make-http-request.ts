import { IpcMainInvokeEvent } from "electron";
import {
	ApiError,
	ApiResponseDto,
	MakeHttpRequestParams,
	MakeHttpRequestResult,
	NativeAPIHandler,
} from "../types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../store";

const axiosInstance: AxiosInstance = axios.create({ timeout: 15000 });

const makeHttpRequest: NativeAPIHandler = async <T = unknown, E = unknown>(
	e: IpcMainInvokeEvent,
	params: MakeHttpRequestParams,
): Promise<MakeHttpRequestResult<T, E>> => {
	const appSettings = store.get("app");

	try {
		const response = await axiosInstance.request<ApiResponseDto<T>>({
			baseURL: appSettings.apiBaseUrl,
			url: params.url,
			method: params.method as AxiosRequestConfig["method"],
			data: params.body,
			headers: { ...params.headers },
		});

		return {
			ok: true,
			status: response.status,
			headers: Object.fromEntries(
				Object.entries(response.headers || {}).map(([k, v]) => [
					k,
					Array.isArray(v) ? v.join(", ") : String(v),
				]),
			),
			response: response.data,
		};
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const headers = error.response?.headers as
				| Record<string, string>
				| undefined;
			const data = error.response?.data as ApiError<E> | E | undefined;

			const apiError: ApiError<E> | E | undefined =
				data &&
				(typeof (data as Record<string, unknown>)?.message === "string" &&
				"code" in (data as Record<string, unknown>)
					? (data as ApiError<E>)
					: ({
							code: error.code || "HTTP_ERROR",
							message: error.message || "Request failed",
							detail: data as E,
							status,
						} as ApiError<E>));

			return {
				ok: false,
				status,
				headers:
					headers &&
					Object.fromEntries(
						Object.entries(headers).map(([k, v]) => [
							k,
							Array.isArray(v) ? v.join(", ") : String(v),
						]),
					),
				error:
					apiError ??
					({
						code: error.code || "HTTP_ERROR",
						message: error.message || "Request failed",
						detail: undefined as unknown as E,
						status,
					} as ApiError<E>),
			};
		}

		return {
			ok: false,
			error: {
				code: "UNKNOWN_ERROR",
				message: String(error),
				detail: undefined as unknown as E,
			} as ApiError<E>,
		};
	}
};

export default makeHttpRequest;
