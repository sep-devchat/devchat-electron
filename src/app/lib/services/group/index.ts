import fetch from "../../fetch";
import { GroupResponse } from "./types";

export function listGroups() {
	return fetch<GroupResponse[]>({
		method: "GET",
		url: "/api/group",
	});
}
