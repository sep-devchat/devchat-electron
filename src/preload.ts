// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";
import type { IpcRendererEvent } from "electron";

const nativeAPINames = [
	"makeHttpRequest",
	"openBrowserForLogin",
	"storeRefreshToken",
	"createAssetUrl",
	"selectFileOrFolder",
	"runCodeByFilePath",
	"runCodeByContent",
	"readFileContent",
];

type NativeApiInvoker = Record<
	string,
	(...args: unknown[]) => Promise<unknown>
>;
const api: NativeApiInvoker = {};
for (const name of nativeAPINames) {
	(api as NativeApiInvoker)[name] = (...args: unknown[]) =>
		ipcRenderer.invoke(name, ...args);
}

contextBridge.exposeInMainWorld("nativeAPI", {
	nativeAPICallback: (
		channel: string,
		cb: (event: IpcRendererEvent, ...args: unknown[]) => void,
	) => {
		ipcRenderer.on(channel, cb);
		return () => ipcRenderer.off(channel, cb);
	},
	...api,
});
