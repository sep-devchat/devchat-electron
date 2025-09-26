import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormRow,
} from "@/app/components/ui/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/app/components/ui/card";
import {
	RegisterFormValues,
	registerSchema,
} from "@/app/lib/services/auth/types";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/app/lib/services/auth";
import { useAuth } from "@/app/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});
	const { refetchProfile } = useAuth();

	const registerMutation = useMutation({
		mutationFn: register,
		onSuccess: (data) => {
			window.localStorage.setItem("accessToken", data.accessToken);
			window.nativeAPI.storeRefreshToken(data.refreshToken);
			refetchProfile();
			toast.success("Account created successfully!");
			navigate({ to: "/" });
		},
		onError: (error) => {
			console.log(error);
			toast.error(`Registration failed: ${error.message}`);
		},
	});

	return (
		<div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/40 p-4">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle>Create your account</CardTitle>
					<CardDescription>
						Fill in the details below to register.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((values) =>
								registerMutation.mutate(values),
							)}
							className="grid grid-cols-1 gap-4"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="jane.doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormRow
								names={["firstName", "lastName"]}
								className="grid grid-cols-1 md:grid-cols-2 gap-4"
							>
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First name</FormLabel>
											<FormControl>
												<Input placeholder="Jane" {...field} />
											</FormControl>
											<FormMessage reserveSpace="row" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last name</FormLabel>
											<FormControl>
												<Input placeholder="Doe" {...field} />
											</FormControl>
											<FormMessage reserveSpace="row" />
										</FormItem>
									)}
								/>
							</FormRow>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="jane@example.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="P@ssw0rd!"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="avatarUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Avatar URL (optional)</FormLabel>
										<FormControl>
											<Input
												placeholder="https://cdn.example.com/avatars/jane.png"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="timezone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Timezone (optional)</FormLabel>
										<FormControl>
											<Input placeholder="America/Los_Angeles" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end pt-2 gap-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate({ to: "/auth/login" })}
								>
									Back to Login
								</Button>
								<Button type="submit">Create account</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
