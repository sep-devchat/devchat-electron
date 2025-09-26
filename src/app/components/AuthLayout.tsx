import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "@tanstack/react-router";

export interface AuthLayoutProps extends PropsWithChildren {}

export default function AuthLayout({ children }: AuthLayoutProps) {
	const { profile, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !profile) {
			navigate({ to: "/auth/login" });
		}
	}, [profile, isLoading]);

	return <>{children}</>;
}
