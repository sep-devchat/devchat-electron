import { Button } from "@/app/components/ui/button";
import { NATIVE_API_OPEN_BROWSER_FOR_LOGIN } from "@/native/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    const dispose = nativeAPI.nativeAPICallback("deep-link", (e, payload) => {
      console.log(payload);
    });

    return () => {
      dispose();
    };
  }, []);

  return (
    <div>
      <h3>Login Page</h3>
      <Button
        onClick={() =>
          nativeAPI.invokeNativeAPI(NATIVE_API_OPEN_BROWSER_FOR_LOGIN)
        }
      >
        Open Browser
      </Button>
    </div>
  );
}
