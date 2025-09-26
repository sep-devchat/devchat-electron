import Store from "electron-store";

const store = new Store({
	defaults: {
		app: {
			appBaseUrl: "https://devchat.online",
			apiBaseUrl: "https://api.devchat.online",
		},
		user: {
			refreshToken: "",
		},
	},
});

export default store;
