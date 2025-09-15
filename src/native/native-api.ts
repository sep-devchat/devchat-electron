import openBrowserForLogin from "./apis/open-browser-for-login";
import readSettings from "./apis/read-settings";
import readdir from "./apis/readdir";
import saveSettings from "./apis/save-settings";
import sayHi from "./apis/say-hi";
import { NATIVE_API_OPEN_BROWSER_FOR_LOGIN, NATIVE_API_READ_SETTINGS, NATIVE_API_READDIR, NATIVE_API_SAVE_SETTINGS, NATIVE_API_SAY_HI, NATIVE_API_MAKE_HTTP_REQUEST } from "./constants";
import { NativeAPIHandler } from "./types";
import makeHttpRequest from "./apis/make-http-request";

const nativeAPI: Record<string, NativeAPIHandler> = {
  [NATIVE_API_SAY_HI]: sayHi,
  [NATIVE_API_READDIR]: readdir,
  [NATIVE_API_READ_SETTINGS]: readSettings,
  [NATIVE_API_SAVE_SETTINGS]: saveSettings,
  [NATIVE_API_OPEN_BROWSER_FOR_LOGIN]: openBrowserForLogin,
  [NATIVE_API_MAKE_HTTP_REQUEST]: makeHttpRequest
};

export default nativeAPI;
