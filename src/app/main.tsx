import "./index.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import router from "./lib/router";
import AuthProvider from "./components/AuthProvider";
import { useAuth } from "./hooks/use-auth";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
