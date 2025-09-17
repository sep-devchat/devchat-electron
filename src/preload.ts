// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";
import { MakeHttpRequestParams } from "./native/types";
import { NATIVE_API_MAKE_HTTP_REQUEST } from "./native/constants";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("nativeAPI", {
  invokeNativeAPI: (channel: string, ...args: any[]) =>
    ipcRenderer.invoke(channel, ...args),
  nativeAPICallback: (channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, cb);
    return () => ipcRenderer.off(channel, cb);
  },
  makeHttpRequest: (params: MakeHttpRequestParams) => ipcRenderer.invoke(NATIVE_API_MAKE_HTTP_REQUEST, params),
});
