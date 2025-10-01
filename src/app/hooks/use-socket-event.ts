import { useEffect } from "react";
import { useSocket } from "./use-socket";

export const useSocketEvent = (
	eventName: string,
	handler: (...args: any[]) => void,
) => {
	const { socket } = useSocket();

	useEffect(() => {
		socket.on(eventName, handler);
		return () => {
			socket.off(eventName, handler);
		};
	}, [eventName, handler, socket]);
};
