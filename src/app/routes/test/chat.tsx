import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarInset,
	SidebarProvider,
} from "@/app/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listGroups } from "@/app/lib/services/group";
import { Label } from "@/app/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { useEffect, useState } from "react";
import { listChannels } from "@/app/lib/services/channel";
import { useAuth, useSocket, useSocketEvent } from "@/app/hooks";
import { SocketEvents } from "@/app/lib/socket/constants";
import { MessageResponse } from "@/app/lib/services/message/type";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/app/components/ui/dialog";

export const Route = createFileRoute("/test/chat")({
	component: RouteComponent,
});

interface MessageItemProps {
	message: MessageResponse;
	isOwnMessage: boolean;
	onEdit?: (message: MessageResponse) => any;
	onDelete?: (message: MessageResponse) => any;
}

function MessageItem(props: MessageItemProps) {
	return (
		<div
			className={
				"flex flex-col gap-y-1" + (props.isOwnMessage ? " items-end" : "")
			}
		>
			<div className="">
				<p
					className={"font-semibold" + (props.isOwnMessage ? " text-end" : "")}
				>
					{props.message.sender.firstName} {props.message.sender.lastName}
				</p>
				<p
					className={
						"italic text-sm text-muted-foreground" +
						(props.isOwnMessage ? " text-end" : "")
					}
				>
					10:00:00 20/10/2023
				</p>
			</div>
			<div
				className={
					"flex gap-x-1 items-end" +
					(props.isOwnMessage ? " flex-row-reverse" : "flex-row")
				}
			>
				<div
					className={`${props.isOwnMessage ? "bg-primary text-primary-foreground" : "bg-accent"} px-2 py-1 rounded-md w-fit max-w-3/4`}
				>
					<p>{props.message.content}</p>
				</div>

				{props.isOwnMessage && (
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreHorizontalIcon />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onSelect={() => props.onEdit && props.onEdit(props.message)}
								>
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									onSelect={() =>
										props.onDelete && props.onDelete(props.message)
									}
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
}

interface EditMessageDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => any;
	message?: MessageResponse;
	handleSave?: (message: MessageResponse) => any;
}

function EditMessageDialog(props: EditMessageDialogProps) {
	const [editMessage, setEditMessage] = useState<MessageResponse>();

	useEffect(() => {
		setEditMessage(props.message);
	}, [props.message]);

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Message</DialogTitle>
				</DialogHeader>
				<div>
					<Input
						value={editMessage?.content}
						onChange={(e) => {
							if (editMessage) {
								setEditMessage({
									...editMessage,
									content: e.target.value,
								});
							}
						}}
					/>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>

					<Button
						onClick={() =>
							props.handleSave && editMessage && props.handleSave(editMessage)
						}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

interface DeleteMessageDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => any;
	message?: MessageResponse;
	handleDelete?: (message: MessageResponse) => any;
}

function DeleteMessageDialog(props: DeleteMessageDialogProps) {
	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Message</DialogTitle>
				</DialogHeader>

				<div>
					<p>Are you sure you want to delete this message?</p>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>

					<Button
						variant="destructive"
						onClick={() =>
							props.message &&
							props.handleDelete &&
							props.handleDelete(props.message)
						}
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function RouteComponent() {
	const listGroupsQuery = useQuery({
		queryKey: ["listGroups"],
		initialData: [],
		queryFn: listGroups,
	});
	const [selectedGroup, setSelectedGroup] = useState<string>();
	const listChannelsQuery = useQuery({
		queryKey: ["listChannels", selectedGroup],
		enabled: !!selectedGroup,
		initialData: [],
		queryFn: () => listChannels(selectedGroup!),
	});
	const [selectedChannel, setSelectedChannel] = useState<string>();
	const { socket } = useSocket();
	const { profile } = useAuth();
	const [messages, setMessages] = useState<MessageResponse[]>([]);
	const [inputMessage, setInputMessage] = useState<string>("");
	const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
	const [editingMessage, setEditingMessage] = useState<MessageResponse>();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
	const [deletingMessage, setDeletingMessage] = useState<MessageResponse>();

	useEffect(() => {
		setSelectedChannel(undefined);
	}, [selectedGroup]);

	useEffect(() => {
		if (!selectedGroup || !selectedChannel || !socket) return;

		socket.emit(SocketEvents.JOIN_ROOM, {
			groupId: selectedGroup,
			channelId: selectedChannel,
		});
	}, [selectedChannel, socket]);

	useSocketEvent(SocketEvents.JOINED_ROOM, async (data) => {
		console.log("Joined room:", data);

		const messages = await socket.emitWithAck(SocketEvents.FETCH_MESSAGES);
		console.log("Fetched messages:", messages);
		setMessages(messages);
	});

	useSocketEvent(SocketEvents.MESSAGE, (message: MessageResponse) => {
		setMessages((prev) => [...prev, message]);
	});

	useSocketEvent(SocketEvents.EDIT_MESSAGE, (editedMessage) => {
		const index = messages.findIndex((m) => m.id == editedMessage.id);
		if (index !== -1) {
			const newMessages = [...messages];
			newMessages[index] = editedMessage;
			setMessages(newMessages);
		}
	});

	useSocketEvent(SocketEvents.DELETE_MESSAGE, (messageId: string) => {
		setMessages((prev) => prev.filter((m) => m.id !== messageId));
	});

	const handleSendMessage = () => {
		if (!inputMessage || !socket || !selectedGroup || !selectedChannel) return;

		socket.emit(SocketEvents.MESSAGE, {
			content: inputMessage,
		});
		setInputMessage("");
	};

	const openEditDialog = (message: MessageResponse) => {
		setEditDialogOpen(true);
		setEditingMessage(message);
	};

	const handleEditMessage = async (message: MessageResponse) => {
		console.log("Edit message:", message);
		setEditDialogOpen(false);
		socket.emit(SocketEvents.EDIT_MESSAGE, {
			messageId: message.id,
			content: message.content,
		});
	};

	const openDeleteDialog = (message: MessageResponse) => {
		setDeleteDialogOpen(true);
		setDeletingMessage(message);
	};

	const handleDeleteMessage = async (message: MessageResponse) => {
		console.log("Delete message:", message);
		setDeleteDialogOpen(false);
		socket.emit(SocketEvents.DELETE_MESSAGE, message.id);
	};

	return (
		<>
			<SidebarProvider>
				<Sidebar variant="inset">
					<SidebarContent>
						<div className="flex flex-col gap-y-1">
							<Label>Group</Label>
							<Select value={selectedGroup} onValueChange={setSelectedGroup}>
								<SelectTrigger>
									<SelectValue placeholder="Select group" />
								</SelectTrigger>
								<SelectContent>
									{listGroupsQuery.data.map((group) => (
										<SelectItem key={group.id} value={group.id}>
											{group.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex flex-col gap-y-1">
							<Label>Channel</Label>
							<Select
								value={selectedChannel}
								onValueChange={setSelectedChannel}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select channel" />
								</SelectTrigger>
								<SelectContent>
									{listChannelsQuery.data.map((channel) => (
										<SelectItem key={channel.id} value={channel.id}>
											{channel.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</SidebarContent>
				</Sidebar>
				<SidebarInset>
					<div className="p-2 flex flex-col gap-y-2 h-full">
						<div className="py-2 px-4 border rounded-md grow flex flex-col gap-y-2">
							{messages.map((message) => (
								<MessageItem
									key={message.id}
									message={message}
									isOwnMessage={message.sender.id == profile?.id}
									onEdit={openEditDialog}
									onDelete={openDeleteDialog}
								/>
							))}
						</div>
						<div className="flex flex-row gap-x-2">
							<Input
								placeholder="Enter messages..."
								value={inputMessage}
								onChange={(e) => setInputMessage(e.target.value)}
							/>
							<Button onClick={handleSendMessage}>Send</Button>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>

			<EditMessageDialog
				open={editDialogOpen}
				onOpenChange={(v) => setEditDialogOpen(v)}
				message={editingMessage}
				handleSave={handleEditMessage}
			/>

			<DeleteMessageDialog
				open={deleteDialogOpen}
				onOpenChange={(v) => setDeleteDialogOpen(v)}
				message={deletingMessage}
				handleDelete={handleDeleteMessage}
			/>
		</>
	);
}
