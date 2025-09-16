import { Button } from "@/app/components/ui/button";
import { pkceIssueToken } from "@/app/lib/services/auth";
import { NATIVE_API_OPEN_BROWSER_FOR_LOGIN } from "@/native/constants";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface DeepLinkPayload {
  code: string;
  url: string;
}

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [codeVerifier, setCodeVerifier] = useState<string>("");
  const loginPkceMutation = useMutation({
    mutationFn: pkceIssueToken,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    const dispose = nativeAPI.nativeAPICallback(
      "deep-link",
      (e, payload: DeepLinkPayload) => {
        loginPkceMutation.mutate({
          authCode: payload.code,
          codeChallengeMethod: "plain",
          codeVerifier: codeVerifier,
        });
      }
    );

    return () => {
      dispose();
    };
  }, [codeVerifier]);

  return (
    <div>
      <h3>Login Page</h3>
      <Button
        onClick={async () => {
          const codeVerifier = await nativeAPI.invokeNativeAPI(
            NATIVE_API_OPEN_BROWSER_FOR_LOGIN
          );
          setCodeVerifier(codeVerifier);
        }}
      >
        Open Browser
      </Button>
    </div>
  );
}
