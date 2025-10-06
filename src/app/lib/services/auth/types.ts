import { z, object, string, url, literal } from "zod";

export interface PkceIssueTokenRequest {
	codeVerifier: string;
	codeChallengeMethod: string;
	authCode: string;
}

export interface TokenResponse {
	accessToken: string;
	refreshToken: string;
}

export interface Profile {
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

export const registerSchema = object({
	username: string()
		.trim()
		.min(3, { message: "Username must be at least 3 characters" })
		.max(50, { message: "Username must be at most 50 characters" }),

	email: z
		.email({ message: "Invalid email address" })
		.max(255, { message: "Email must be at most 255 characters" }),

	password: string()
		.min(8, { message: "Password must be at least 8 characters" })
		.max(128, { message: "Password must be at most 128 characters" })
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least 1 lowercase letter",
		})
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least 1 uppercase letter",
		})
		.refine((val) => /\d/.test(val), {
			message: "Password must contain at least 1 number",
		})
		.refine((val) => /[^A-Za-z0-9]/.test(val), {
			message: "Password must contain at least 1 symbol",
		}),

	firstName: string()
		.trim()
		.min(1, { message: "First name is required" })
		.max(100, { message: "First name must be at most 100 characters" }),

	lastName: string()
		.trim()
		.min(1, { message: "Last name is required" })
		.max(100, { message: "Last name must be at most 100 characters" }),

	avatarUrl: url({ message: "avatarUrl must be a valid URL" })
		.optional()
		.or(literal("").transform(() => undefined)),

	timezone: string()
		.trim()
		.max(50, { message: "Timezone must be at most 50 characters" })
		.optional()
		.or(literal("").transform(() => undefined)),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RefreshTokenRequest {
	refreshToken: string;
}
