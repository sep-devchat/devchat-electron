import fetch from "../fetch";

export interface PkceIssueTokenRequest {
    codeVerifier: string;
    codeChallengeMethod: string;
    authCode: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export async function pkceIssueToken(dto: PkceIssueTokenRequest) {
    const url = `/api/auth/pkce-issue-token`
    return await fetch<TokenResponse>({
        url,
        method: "POST",
        body: dto,
    })
}

export interface ProfileResponse {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    timezone?: string;
}

export async function fetchProfile() {
    const url = `/api/auth/profile`;
    return await fetch<ProfileResponse>({
        url,
        method: "GET",
    });
}