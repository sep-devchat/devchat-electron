import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "../layout/MainLayout";

export const Route = createFileRoute("/chat")({
	component: MainLayout,
});
