// Import the generated route tree
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import type { AuthContextProps } from "../contexts/auth.context";

const history = createMemoryHistory();

// Create a new router instance
const router = createRouter({
	routeTree,
	history,
	context: {
		// Will be provided at runtime via RouterProvider context
		auth: undefined as unknown as AuthContextProps,
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default router;
