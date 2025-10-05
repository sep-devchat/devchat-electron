import { ProfileResponse } from "../auth/types";

export interface MessageResponse {
	id: string;
	channelId: string;
	threadId: string | null;
	senderId: string;
	parentMessageId: string | null;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	sender: ProfileResponse;
}
