import { createContext } from "react";
import { ProfileResponse } from "../lib/services/auth/types";

export interface AuthContextProps {
	profile?: ProfileResponse;
	refetchProfile: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
