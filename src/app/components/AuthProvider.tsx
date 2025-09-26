import { PropsWithChildren, useState } from "react";
import AuthContext from "../contexts/auth.context";
import { fetchProfile } from "../lib/services/auth";
import { ProfileResponse } from "../lib/services/auth/types";

export default function AuthProvider({ children }: PropsWithChildren) {
	const [profile, setProfile] = useState<ProfileResponse>();
	const [isLoading, setIsLoading] = useState(false);

	const refetchProfile = async () => {
		setIsLoading(true);
		try {
			const data = await fetchProfile();
			setProfile(data);
		} catch (err) {
			console.log("Failed to fetch profile", err);
			setProfile(undefined);
		}

		setIsLoading(false);
	};

	return (
		<AuthContext.Provider
			value={{
				profile,
				refetchProfile,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
