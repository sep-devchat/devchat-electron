import fetch from "../../fetch";
import { MessageResponse } from "./type";

const apiPath = "/api/message";

export async function listMessages() {
	return await fetch<MessageResponse[]>({
		url: apiPath,
		method: "GET",
	});
}
