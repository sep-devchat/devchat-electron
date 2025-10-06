// Layout wraps all pages; nested routes render via TanStack Router's Outlet
import MainBg from "@/app/components/custom/MainBackground/MainBg";
import { Outlet } from "@tanstack/react-router";
import { MainLayoutContainer } from "./MainLayout.styled";
import TitleBar from "./TitleBar/TitleBar";
import { User } from "lucide-react";
import GroupSidebar from "./GroupSidebar";
import LeftSidebar from "./LeftSidebar";
import Header from "./Header";
import Profile from "./Profile";
import AuthLayout from "@/app/components/AuthLayout";

const MainLayout = () => {
	return (
		<AuthLayout>
			<MainBg />
			<MainLayoutContainer className="px-4">
				<TitleBar title="DevChat" icon={<User />} />
				<div className="grid grid-cols-12 h-[93vh]">
					<div className="col-span-2 flex gap-2">
						<GroupSidebar />
						<LeftSidebar />
					</div>
					<div className="col-span-10 flex flex-col relative">
						<Header />
						<div className="w-full h-full rounded-br-lg bg-[rgba(255,255,255,0.55)] backdrop-blur-md border border-border/60 overflow-hidden relative z-[5]">
							<Outlet />
						</div>
					</div>
				</div>
				<Profile />
			</MainLayoutContainer>
		</AuthLayout>
	);
};

export default MainLayout;
