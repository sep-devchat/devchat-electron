import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/use-auth";
import { MessageSquare, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const navigate = useNavigate();
	const { profile } = useAuth();
	const isAuthed = !!profile;

	return (
		<div className="h-screen w-screen flex bg-background text-foreground overflow-hidden">
			{/* Sidebar placeholder (channels / conversations) */}
			<aside className="hidden md:flex md:flex-col w-60 border-r bg-muted/40">
				<div className="h-12 px-4 flex items-center gap-2 border-b font-medium">
					<MessageSquare className="size-4" /> DevChat
				</div>
				<div className="p-3 text-xs uppercase tracking-wide text-muted-foreground">
					Conversations
				</div>
				<div className="flex-1 overflow-auto px-2 space-y-1 text-sm text-muted-foreground">
					<div className="px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground cursor-default">
						# general
					</div>
					<div className="px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground cursor-default">
						# dev-help
					</div>
					<div className="px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground cursor-default">
						# design
					</div>
					<div className="px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground cursor-default">
						# releases
					</div>
				</div>
				<div className="p-3 border-t text-xs text-muted-foreground">
					{isAuthed
						? `Signed in as ${profile?.firstName ?? ""}`
						: "Not signed in"}
				</div>
			</aside>

			{/* Main area */}
			<div className="flex-1 flex flex-col">
				<header className="h-12 flex items-center justify-between border-b px-4 gap-3">
					<div className="font-medium text-sm">
						{isAuthed ? "Home" : "Welcome"}
					</div>
					<div className="flex items-center gap-2">
						{!isAuthed && (
							<>
								<Button
									size="sm"
									variant="outline"
									onClick={() => navigate({ to: "/auth/login" })}
								>
									<LogIn className="size-4 mr-1" /> Login
								</Button>
								<Button
									size="sm"
									onClick={() => navigate({ to: "/auth/register" })}
								>
									<UserPlus className="size-4 mr-1" /> Register
								</Button>
							</>
						)}
					</div>
				</header>
				<main className="flex-1 flex flex-col md:flex-row overflow-hidden">
					{/* Primary panel */}
					<section className="flex-1 overflow-auto p-6 space-y-6">
						{isAuthed ? (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold tracking-tight">
									Welcome back, {profile?.firstName ?? ""}
								</h2>
								<p className="text-sm text-muted-foreground max-w-prose">
									This is your home screen. Select a conversation on the left or
									create a new space.
								</p>
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
									<QuickTile
										label="New Conversation"
										onClick={() => {
											/* TODO */
										}}
									/>
									<QuickTile
										label="Open Settings"
										onClick={() => {
											/* TODO */
										}}
									/>
									<QuickTile
										label="View Profile"
										onClick={() => {
											/* TODO */
										}}
									/>
								</div>
							</div>
						) : (
							<div className="h-full flex flex-col items-center justify-center text-center gap-6">
								<div className="space-y-2 max-w-md">
									<h1 className="text-2xl font-semibold tracking-tight">
										DevChat Desktop
									</h1>
									<p className="text-sm text-muted-foreground">
										Sign in or create an account to start collaborating.
									</p>
								</div>
								<div className="flex flex-col sm:flex-row gap-3">
									<Button
										size="lg"
										onClick={() => navigate({ to: "/auth/login" })}
									>
										<LogIn className="size-4 mr-2" /> Sign In
									</Button>
									<Button
										size="lg"
										variant="outline"
										onClick={() => navigate({ to: "/auth/register" })}
									>
										<UserPlus className="size-4 mr-2" /> Register
									</Button>
								</div>
							</div>
						)}
					</section>
					{/* Secondary / activity panel */}
					{isAuthed && (
						<aside className="w-full md:w-72 border-t md:border-t-0 md:border-l h-48 md:h-auto flex flex-col">
							<div className="px-4 py-2 border-b text-xs font-medium tracking-wide text-muted-foreground">
								Recent Activity
							</div>
							<div className="flex-1 overflow-auto text-sm divide-y">
								<div className="px-4 py-2 hover:bg-accent/50 cursor-default">
									You joined #general
								</div>
								<div className="px-4 py-2 hover:bg-accent/50 cursor-default">
									Release v0.1.0 deployed
								</div>
								<div className="px-4 py-2 hover:bg-accent/50 cursor-default">
									New member invited
								</div>
							</div>
						</aside>
					)}
				</main>
			</div>
		</div>
	);
}

interface QuickTileProps {
	label: string;
	onClick: () => void;
}

function QuickTile({ label, onClick }: QuickTileProps) {
	return (
		<button
			onClick={onClick}
			className="group rounded-md border bg-card hover:bg-accent/40 transition-colors px-4 py-3 text-left text-sm font-medium flex items-center justify-between"
		>
			<span>{label}</span>
			<span className="text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
				▶
			</span>
		</button>
	);
}
