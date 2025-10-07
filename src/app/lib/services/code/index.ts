import fetch from "../../fetch";
import { CodeExecutionResponse, RunCodeRequest } from "./types";

export function runCode(dto: RunCodeRequest) {
	const url = "/api/code/run";
	return fetch<CodeExecutionResponse>({
		method: "POST",
		url,
		body: dto,
	});
}
