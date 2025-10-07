import { dialog } from "electron";
import { NativeAPIHandler } from "../types";

const selectFileOrFolder: NativeAPIHandler = async (
	e,
	folder: boolean = false,
) => {
	const result = await dialog.showOpenDialog({
		properties: [folder ? "openDirectory" : "openFile"],
	});
	if (result.canceled) {
		return [];
	}
	return result.filePaths;
};

export default selectFileOrFolder;
