import { PropsWithChildren, useEffect } from "react";
import SocketContext from "../contexts/socket.context";
import { Socket } from "socket.io-client";
import { SocketEvents } from "../lib/socket/constants";

export interface SocketProviderProps extends PropsWithChildren {
	socket: Socket;
}

export default function SocketProvider({
	children,
	socket,
}: SocketProviderProps) {
	useEffect(() => {
		const handleConnect = () => {
			console.log("Socket connected:", socket.id);
			socket.emit(SocketEvents.AUTHENTICATE, {
				token: localStorage.getItem("accessToken") || "",
			});
		};

		const handleException = (err: any) => {
			console.error("Socket exception:", err);
		};

		const handleAuthenticateFailed = () => {
			console.error("Socket authentication failed");
		};

		const handleReady = () => {
			console.log("Socket is ready");
		};

		socket.on(SocketEvents.CONNECT, handleConnect);
		socket.on(SocketEvents.EXCEPTION, handleException);
		socket.on(SocketEvents.AUTHENTICATE_FAILED, handleAuthenticateFailed);
		socket.on(SocketEvents.SOCKET_READY, handleReady);

		socket.connect();

		return () => {
			socket.off(SocketEvents.CONNECT, handleConnect);
			socket.off(SocketEvents.EXCEPTION, handleException);
			socket.off(SocketEvents.AUTHENTICATE_FAILED, handleAuthenticateFailed);
			socket.off(SocketEvents.SOCKET_READY, handleReady);
			if (!socket.disconnected) socket.disconnect();
		};
	}, [socket]);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
}
