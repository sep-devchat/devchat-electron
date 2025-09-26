import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import ThreadPanel from "@/app/components/custom/RightPanel/ThreadPanel/ThreadPanel";
import CodeList from "@/app/components/custom/RightPanel/CodeList/CodeList";
import MemberList from "@/app/components/custom/RightPanel/MemberList/MemberList";
import MainBg from "@/app/components/custom/MainBackground/MainBg";
import SidebarMenu from "@/app/components/custom/Sidebar/Sidebar";
import CenterPanel from "@/app/components/custom/CenterPanel/CenterPanel";
import HeaderBar from "@/app/components/custom/UserHeader/UserHeader";
import {
	ContentWrapper,
	PageWrapper,
} from "@/app/pages/User/Channel/Channel.styled";
import { sampleData, SampleData } from "@/app/pages/User/Channel/sample-data";
import { useAuth } from "@/app/hooks/use-auth";

export const Route = createFileRoute("/user/channel")({
	component: ChatChannel,
});

function ChatChannel() {
	useAuth();
	const data: SampleData = sampleData();

	const [activeSection, setActiveSection] = useState<string>("");
	const [, setChannelSelected] = useState<string>("");
	const [iconSelected, setIconSelected] = useState<string>("");
	const [grNameSelected, setGrNameSelected] = useState<string>("");

	useEffect(() => {
		setActiveSection(data.groups[0]?.name || "");
		setChannelSelected(data.expanded_group.channels[0]?.name || "");
	}, [data.expanded_group, data.groups]);

	const renderPanel = () => {
		switch (iconSelected) {
			case "spool":
				return <ThreadPanel />;
			case "code":
				return <CodeList />;
			case "users":
				return <MemberList />;
			default:
				return <MemberList />;
		}
	};

	return (
		<>
			<MainBg />
			<PageWrapper>
				<HeaderBar
					title={grNameSelected ?? "Hi friend!"}
					right={<IoNotifications />}
				/>
				<ContentWrapper>
					<SidebarMenu
						activeSection={activeSection}
						channelSelected={setChannelSelected}
						setGrNameSelected={setGrNameSelected}
					/>
					<CenterPanel
						currentUserId="user-123"
						setIconSelected={setIconSelected}
						iconSelected={iconSelected}
					/>
					{renderPanel()}
				</ContentWrapper>
			</PageWrapper>
		</>
	);
}
