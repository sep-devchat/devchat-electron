import { shell } from "electron";
import { NativeAPIHandler } from "../types";
import crypto from "crypto";
import store from "../store";

function generateCodeVerifier() {
	// 43–128 recommended. 64 or 96 are common.
	const bytes = crypto.randomBytes(96);
	// Map to the allowed PKCE charset (unreserved URI characters)
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
	let verifier = "";
	for (let i = 0; i < bytes.length; i++) {
		verifier += charset[bytes[i] % charset.length];
	}
	return verifier;
}

const openBrowserForLogin: NativeAPIHandler = async () => {
	const appSettings = store.get("app");
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = codeVerifier;
	const url = new URL(appSettings.appBaseUrl + "/auth/login");
	url.searchParams.set("codeChallengeMethod", "plain");
	url.searchParams.set("codeChallenge", codeChallenge);
	await shell.openExternal(url.toString());
	return codeVerifier;
};

export default openBrowserForLogin;
