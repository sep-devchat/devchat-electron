import { NATIVE_API_MAKE_HTTP_REQUEST } from "@/native/constants";

interface PkceIssueTokenRequest {
    codeVerifier: string;
    codeChallengeMethod: string;
    authCode: string;
}

export async function pkceIssueToken(dto: PkceIssueTokenRequest) {
    const response = await nativeAPI.invokeNativeAPI(NATIVE_API_MAKE_HTTP_REQUEST, {
        url: "",
        method: "post",
        body: dto,

    })
}