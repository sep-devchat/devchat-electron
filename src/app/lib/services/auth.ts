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
    const url = `https://api.devchat.online/api/auth/pkce-issue-token`
    const result = await nativeAPI.makeHttpRequest<TokenResponse>({
        url: url,
        method: "POST",
        body: dto,
    });

    if (result.error) {
        throw result.error;
    }

    return result.response!.data.data;
}