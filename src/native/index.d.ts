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
	// registerSocketCallback(eventName: string, cb: (...args: any[]) => void): Promise<() => void>;
	// sendSocketEvent: (eventName: string, ...args: any[]) => Promise<void>;
}

declare global {
	interface Window {
		nativeAPI: nativeAPI;
	}
}
