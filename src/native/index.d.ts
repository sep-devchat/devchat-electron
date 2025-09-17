import { MakeHttpRequestParams, MakeHttpRequestResult } from "./types"

declare global {
  namespace nativeAPI {
    function invokeNativeAPI(channel: string, ...message: any[]): Promise<any>;
    function nativeAPICallback(channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void): () => void;
    function makeHttpRequest<T = any>(params: MakeHttpRequestParams): Promise<MakeHttpRequestResult<T>>;
  }
}