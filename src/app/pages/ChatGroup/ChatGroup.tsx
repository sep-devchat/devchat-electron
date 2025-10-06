import ChatArea from "@/app/components/custom/ChatArea";
import { Button } from "@/app/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
// import { useParams } from "@tanstack/react-router";

const ChatGroup = () => {
	// const { groupId } = useParams({ from: '/chat/group/$groupId' });
	const navigate = useNavigate();
	return (
		<>
			<Button onClick={() => navigate({ to: "/test/code" })}>Test Code</Button>
			<ChatArea />
		</>
	);
};

export default ChatGroup;
