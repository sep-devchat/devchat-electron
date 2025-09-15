import { shell } from "electron";
import { NativeAPIHandler } from "../types";
import crypto from "crypto";

const baseUrl = "http://localhost:5173";
// const baseUrl = "https://devchat.online";
const loginUrl = (codeChallengeMethod: string, codeChallenge: string) => `${baseUrl}/auth/login?codeChallengeMethod=${codeChallengeMethod}&codeChallenge=${codeChallenge}`;

function generateCodeVerifier() {
    // 43–128 recommended. 64 or 96 are common.
    const bytes = crypto.randomBytes(96);
    // Map to the allowed PKCE charset (unreserved URI characters)
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let verifier = '';
    for (let i = 0; i < bytes.length; i++) {
        verifier += charset[bytes[i] % charset.length];
    }
    return verifier;
}


const openBrowserForLogin: NativeAPIHandler = async (e) => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = codeVerifier;
    const url = loginUrl("plain", codeChallenge);
    await shell.openExternal(url);
    return codeVerifier;
}

export default openBrowserForLogin;