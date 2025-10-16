import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
	beforeLoad: () => {
		throw redirect({ to: "/test" });
	},
});

function Index() {
	return <></>;
}
