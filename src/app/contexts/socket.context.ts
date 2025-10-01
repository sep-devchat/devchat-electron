import { Socket } from "socket.io-client";
import { createContext } from "react";

export interface SocketContextProps {
	socket: Socket;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export default SocketContext;
