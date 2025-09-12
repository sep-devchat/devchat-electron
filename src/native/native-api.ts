import readSettings from "./apis/read-settings";
import readdir from "./apis/readdir";
import saveSettings from "./apis/save-settings";
import sayHi from "./apis/say-hi";
import { NATIVE_API_READ_SETTINGS, NATIVE_API_READDIR, NATIVE_API_SAVE_SETTINGS, NATIVE_API_SAY_HI } from "./constants";
import { NativeAPIHandler } from "./types";

const nativeAPI: Record<string, NativeAPIHandler> = {
  [NATIVE_API_SAY_HI]: sayHi,
  [NATIVE_API_READDIR]: readdir,
  [NATIVE_API_READ_SETTINGS]: readSettings,
  [NATIVE_API_SAVE_SETTINGS]: saveSettings
};

export default nativeAPI;
