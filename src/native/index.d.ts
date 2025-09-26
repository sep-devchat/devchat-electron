import { MakeHttpRequestParams, MakeHttpRequestResult } from "./types";

interface nativeAPI {
	nativeAPICallback(
		channel: string,
		cb: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void,
	): () => void;
	makeHttpRequest<T = unknown>(
		params: MakeHttpRequestParams,
	): Promise<MakeHttpRequestResult<T>>;
	openBrowserForLogin(): Promise<string>;
	storeRefreshToken(token: string): Promise<void>;
	getRefreshToken(): Promise<string>;
	createAssetUrl(relPath: string): Promise<string>;
}

declare global {
	interface Window {
		nativeAPI: nativeAPI;
	}
}
