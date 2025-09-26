import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			routesDirectory: path.resolve(__dirname, "./src/app/routes"),
			generatedRouteTree: path.resolve(__dirname, "./src/app/routeTree.gen.ts"),
		}),
		react(),
		tailwindcss(),
	],
	// Serve static files from the project's `assets` folder during development
	// and copy them to the renderer output on build.
	publicDir: path.resolve(__dirname, "./assets"),
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		host: "0.0.0.0",
	},
});
