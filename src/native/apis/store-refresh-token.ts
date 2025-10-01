import { safeStorage } from "electron";
import store from "../store";
import { NativeAPIHandler } from "../types";

const storeRefreshToken: NativeAPIHandler = async (e, token: string) => {
	const encrypted = safeStorage.encryptString(token);
	store.set("user.refreshToken", encrypted.toString("base64"));
};

export default storeRefreshToken;
