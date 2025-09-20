import { MakeHttpRequestParams, MakeHttpRequestResult } from "./types"

interface nativeAPI {
  nativeAPICallback(channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void): () => void;
  makeHttpRequest<T = any>(params: MakeHttpRequestParams): Promise<MakeHttpRequestResult<T>>;
  openBrowserForLogin(): Promise<string>;
  storeRefreshToken(token: string): Promise<void>;
  getRefreshToken(): Promise<string>;
}

declare global {
  interface Window {
    nativeAPI: nativeAPI;
  }
}