import socket from "../socket";
import { NativeAPIHandler } from "../types";

const registerSocketCallback: NativeAPIHandler = async (
	e,
	eventName: string,
	cb: (...args: any[]) => void,
) => {
	socket.on(eventName, cb);
	return () => {
		socket.off(eventName, cb);
	};
};

export default registerSocketCallback;
