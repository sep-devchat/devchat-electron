import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { pkceIssueToken } from "@/app/lib/services/auth";
import { NATIVE_API_OPEN_BROWSER_FOR_LOGIN } from "@/native/constants";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn, UserPlus, ExternalLink } from "lucide-react";

interface DeepLinkPayload {
  code: string;
  url: string;
}

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [codeVerifier, setCodeVerifier] = useState<string>("");
  const [isOpening, setIsOpening] = useState<boolean>(false);
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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to DevChat</CardTitle>
          <CardDescription>
            Sign in to continue. We’ll open a secure browser window to
            authenticate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Use your account to log in. After authorizing in the browser, return
            to the app to finish.
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              navigate({ to: "/auth/register" })
            }}
          >
            <UserPlus className="size-4" /> Sign Up
          </Button>
          <Button
            onClick={async () => {
              try {
                setIsOpening(true);
                const codeVerifier = await nativeAPI.invokeNativeAPI(
                  NATIVE_API_OPEN_BROWSER_FOR_LOGIN
                );
                setCodeVerifier(codeVerifier);
              } finally {
                setIsOpening(false);
              }
            }}
            disabled={isOpening}
          >
            {isOpening ? (
              <>
                {/* Simple spinner via Tailwind animate-spin */}
                <span className="mr-2 inline-block size-4 rounded-full border-2 border-transparent border-t-current animate-spin" />
                Opening…
              </>
            ) : (
              <>
                <LogIn className="size-4" /> Sign In <ExternalLink className="size-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
