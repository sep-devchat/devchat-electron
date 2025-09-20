import { NATIVE_API_SAY_HI } from "@/native/constants";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const cb = (e: Electron.IpcRendererEvent, msg: string) => {
      console.log("Msg from ipc main: ", msg);
    };

    const dispose = nativeAPI.nativeAPICallback(NATIVE_API_SAY_HI, cb);

    return () => {
      console.log("destruction");
      dispose();
    };
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button
        onClick={(e) => {
          navigate({ to: "/auth/login" });
        }}
      >
        Go to Login
      </Button>
      <Button
        onClick={(e) => {
          navigate({ to: "/main/chat" });
        }}
      >
        Go to Chat Page
      </Button>
    </div>
  );
}
