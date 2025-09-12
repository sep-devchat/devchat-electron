import { NATIVE_API_SAY_HI } from "@/native/constants";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  useEffect(() => {
    const cb = (e: Electron.IpcRendererEvent, msg: string) => {
      console.log("Msg from ipc main: ", msg);
    }

    const dispose = nativeAPI.nativeAPICallback(NATIVE_API_SAY_HI, cb);

    return () => {
      console.log("destruction")
      dispose();
    };
  }, []);

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={() => nativeAPI.invokeNativeAPI(NATIVE_API_SAY_HI, "Long")}>Click</button>
    </div>
  );
}
