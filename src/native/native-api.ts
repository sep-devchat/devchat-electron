import createAssetUrl from "./apis/create-asset-url";
import getRefreshToken from "./apis/get-refresh-token";
import makeHttpRequest from "./apis/make-http-request";
import openBrowserForLogin from "./apis/open-browser-for-login";
import storeRefreshToken from "./apis/store-refresh-token";
import { NativeAPIHandler } from "./types";

const nativeAPI: Record<string, NativeAPIHandler> = {
	makeHttpRequest,
	openBrowserForLogin,
	storeRefreshToken,
	getRefreshToken,
	createAssetUrl,
};

export default nativeAPI;
