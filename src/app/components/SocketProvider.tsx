import { PropsWithChildren } from "react";
import SocketContext, { SocketContextProps } from "../contexts/socket.context";
import { Socket } from "socket.io-client";

export interface SocketProviderProps extends PropsWithChildren {
	socket: Socket;
}

export default function SocketProvider({
	children,
	socket,
}: SocketProviderProps) {
	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
}
