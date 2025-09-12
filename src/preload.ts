// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("nativeAPI", {
  invokeNativeAPI: (channel: string, ...args: any[]) =>
    ipcRenderer.invoke(channel, ...args),
  nativeAPICallback: (channel: string, cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, cb);
    return () => ipcRenderer.off(channel, cb);
  },
});
