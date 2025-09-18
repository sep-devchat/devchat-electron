import { createContext } from "react";
import { ProfileResponse } from "../lib/services/auth";

export interface AuthContextProps {
    profile?: ProfileResponse;
    refetchProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export default AuthContext;