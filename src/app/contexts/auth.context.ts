import { createContext } from "react";
import { Profile } from "../lib/services/auth/types";

export interface AuthContextProps {
	profile?: Profile;
	refetchProfile: () => Promise<void>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;
