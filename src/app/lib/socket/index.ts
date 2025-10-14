import { io } from "socket.io-client";

// const socketUrl = "wss://api.devchat.online";
const socketUrl = "ws://localhost:3000";

const socket = io(socketUrl, {
	transports: ["websocket"],
	autoConnect: false,
});

export default socket;
