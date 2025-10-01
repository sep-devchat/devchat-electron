import "./index.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./lib/router";
import AuthProvider from "./components/AuthProvider";
import { useAuth } from "./hooks/use-auth";
import SocketProvider from "./components/SocketProvider";
import socket from "@/app/lib/socket";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (!rootEl) {
	throw new Error("Root element #root not found");
}
const root = createRoot(rootEl);
root.render(<App />);

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<SocketProvider socket={socket}>
					<InnerApp />
				</SocketProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
