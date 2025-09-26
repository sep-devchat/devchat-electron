import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "../components/ui/sonner";
import { AuthContextProps } from "../contexts/auth.context";

interface RootRouteContext {
	auth: AuthContextProps;
}

export const Route = createRootRoute<RootRouteContext>({
	component: () => (
		<>
			<Outlet />
			<Toaster position="top-center" richColors />
			<TanStackRouterDevtools />
		</>
	),
});
