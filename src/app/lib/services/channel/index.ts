import fetch from "../../fetch";
import { ChannelResponse } from "./types";

export function listChannels(groupId: string) {
	return fetch<ChannelResponse[]>({
		method: "GET",
		url: `/api/group/${groupId}/channel`,
	});
}
