import { Button } from "@/app/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/test/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	return (
		<div className="">
			<Button onClick={() => navigate({ to: "/test/code" })}>Code</Button>
			<Button onClick={() => navigate({ to: "/test/chat" })}>Chat</Button>
		</div>
	);
}
