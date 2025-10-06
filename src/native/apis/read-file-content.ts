import { NativeAPIHandler } from "../types";
import fs from "fs";

const readFileContent: NativeAPIHandler = async (e, filePath: string) => {
	return fs.readFileSync(filePath, "utf-8");
};

export default readFileContent;
