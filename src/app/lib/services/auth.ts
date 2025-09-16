import axios from "axios";
import { ApiResponseDto } from "./types";

interface PkceIssueTokenRequest {
    codeVerifier: string;
    codeChallengeMethod: string;
    authCode: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export async function pkceIssueToken(dto: PkceIssueTokenRequest) {
    // const instance = nativeAPI.getAxiosInstance();
    // console.log(instance);
    const instance = axios.create();
    const url = `https://api.devchat.online/api/auth/pkce-issue-token`
    return await instance<ApiResponseDto<TokenResponse>>({
        url: url,
        method: "POST",
        data: dto,
    });
}