import socket from "../socket";
import { NativeAPIHandler } from "../types";

const sendSocketEvent: NativeAPIHandler = async (
	e,
	eventName: string,
	...args: any[]
) => {
	socket.emit(eventName, ...args);
};

export default sendSocketEvent;
