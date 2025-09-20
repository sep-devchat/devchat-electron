// Import the generated route tree
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

const history = createMemoryHistory({ initialEntries: ["/"] });

// Create a new router instance
const router = createRouter({
    routeTree,
    history,
    context: {
        auth: undefined!
    }
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export default router;