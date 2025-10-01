import { useContext } from "react";
import SocketContext from "../contexts/socket.context";

export const useSocket = () => {
	const ctx = useContext(SocketContext);
	if (!ctx) throw new Error("useSocket must be used within a SocketProvider");
	return ctx;
};
