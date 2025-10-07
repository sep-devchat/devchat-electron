import { ProgrammingLanguageEnum } from "@/shared";

export interface RunCodeRequest {
	language: ProgrammingLanguageEnum;
	code: string;
}

export interface CodeExecutionResponse {
	output: string;
}
