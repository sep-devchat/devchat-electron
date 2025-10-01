import store from "../store";
import { io } from "socket.io-client";
import { SocketEvents } from "./constants";

const socketUrl = store.get("app.socketUrl");

const socket = io(socketUrl, {
	transports: ["websockets"],
});

socket.on(SocketEvents.CONNECT, () => {
	console.log("Socket connected:", socket.id);
});

socket.on(SocketEvents.DISCONNECT, (reason) => {
	console.log("Socket disconnected:", reason);
});

export default socket;
