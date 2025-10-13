import { ProgrammingLanguageEnum } from "../../shared";
import { NativeAPIHandler } from "../types";
import { execMap } from "./code-execution";

const runCodeByContent: NativeAPIHandler = async (
	e,
	language: string,
	content: string,
) => {
	return await execMap[language as ProgrammingLanguageEnum](content);
};

export default runCodeByContent;
