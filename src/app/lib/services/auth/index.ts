import fetch from "../../fetch";
import { PkceIssueTokenRequest, ProfileResponse, RegisterFormValues, TokenResponse } from "./types";

export async function pkceIssueToken(dto: PkceIssueTokenRequest) {
    const url = `/api/auth/pkce-issue-token`
    return await fetch<TokenResponse>({
        url,
        method: "POST",
        body: dto,
    })
}

export async function fetchProfile() {
    const url = `/api/auth/profile`;
    return await fetch<ProfileResponse>({
        url,
        method: "GET",
    });
}

export async function register(data: RegisterFormValues) {
    const url = `/api/auth/register`;
    return await fetch<TokenResponse>({
        url,
        method: "POST",
        body: data,
    });
}