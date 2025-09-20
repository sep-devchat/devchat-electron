import { safeStorage } from "electron";
import store from "../../store";
import { NativeAPIHandler } from "../types";

const getRefreshToken: NativeAPIHandler = async (e) => {
    const encrypted = store.get("user.refreshToken");
    return safeStorage.decryptString(Buffer.from(encrypted, "base64"));
}

export default getRefreshToken;