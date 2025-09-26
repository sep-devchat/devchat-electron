// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

const nativeAPINames = [
	"makeHttpRequest",
	"openBrowserForLogin",
	"storeRefreshToken",
];

const api: any = {};
for (const name of nativeAPINames) {
	api[name] = (...args: any[]) => ipcRenderer.invoke(name, ...args);
}

contextBridge.exposeInMainWorld("nativeAPI", {
	nativeAPICallback: (
		channel: string,
		cb: (event: Electron.IpcRendererEvent, ...args: any[]) => void,
	) => {
		ipcRenderer.on(channel, cb);
		return () => ipcRenderer.off(channel, cb);
	},
	...api,
});
