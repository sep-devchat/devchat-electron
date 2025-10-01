import { io } from "socket.io-client";

const socketUrl = "wss://api.devchat.online";

const socket = io(socketUrl, {
	transports: ["websocket"],
	autoConnect: false,
});

export default socket;
