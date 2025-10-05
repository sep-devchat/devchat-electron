import { PropsWithChildren, useEffect, useState } from "react";
import AuthContext from "../contexts/auth.context";
import { fetchProfile } from "../lib/services/auth";
import { Profile } from "../lib/services/auth/types";

export default function AuthProvider({ children }: PropsWithChildren) {
	const [profile, setProfile] = useState<Profile>();
	const [isLoading, setIsLoading] = useState(true);

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

	useEffect(() => {
		refetchProfile();
	}, []);

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
