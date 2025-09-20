import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import {
  Hash,
  Settings,
  Send,
  Plus,
  Search,
  Home,
  MessageSquare,
  Bell,
  Pin,
  Users,
  AtSign,
  HelpCircle,
  Inbox,
  Phone,
  Video,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/main/chat")({
  component: RouteComponent,
});

// Mock data for groups/servers
const mockGroups = [
  {
    id: 2,
    name: "Group 1",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Group 2",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Development",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Design Team",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
];

// Mock data
const mockUsers = [
  { id: 1, name: "Nguyen Van A", avatar: "", status: "online" },
  { id: 2, name: "Nguyen Van B", avatar: "", status: "offline" },
  { id: 3, name: "User 3", avatar: "", status: "online" },
  { id: 4, name: "User 4", avatar: "", status: "offline" },
];

const mockMessages = [
  {
    id: 1,
    user: "Nguyen Van A",
    avatar: "",
    timestamp: "29 thang 8, 2025",
    content:
      "Mọi người ơi là mọi người... với cần thiết chưa cởng đông đó...\n- Luôn hoà đồng, thân thiện với cùng măng căng sa và việc gật đầu thấc mặc với nhau.\n- Không chửi sẽ không hinh ảnh 18+, hành đình bẽm lố(dark meme)là vào channel meme)...\n- Không truyện bá từ trong các đoạn, không có hoặc hỏi dùng không tốt lên quan đến chính trị quốc gia.\n- Không phản bài vừng miện, tâm đỗ, sỉ nhục được mọi hành thức\n- Không spam (tin không liên quan).\n- Hãy cùng nhau phát triển một câu học bổ huyết về nhé! :3 Chúc các bạn một ngày vui vẻ ❤",
  },
];

function RouteComponent() {
  const [selectedGroup, setSelectedGroup] = useState(2);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Group Information Header */}
      <div
        className="p-2 border-b text-center"
        style={{
          background: "#b5c7e8",
        }}
      >
        <p>Group {selectedGroup}</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Group Selection Sidebar */}
        <div
          className="w-20 border-r-1 flex flex-col items-center py-4"
          style={{
            background: "linear-gradient(135deg, #f5f2df, #dfe7f5)",
          }}
        >
          {/* Logo */}
          <div className="mb-6">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white text-xs">
                LOGO
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col justify-center gap-3 mb-6 relative">
            {mockGroups.map((group) => (
              <div
                key={group.id}
                className="relative group flex items-center justify-center"
              >
                {/* Selection indicator bar */}
                {selectedGroup === group.id && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-1 h-8 bg-blue-600 rounded-full"></div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-12 h-12 rounded-full p-0 border-0 hover:scale-105 transition-transform"
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={group.avatar} alt={group.name} />
                    <AvatarFallback className="bg-indigo-500 text-white text-xs">
                      {group.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>

                {/* Tooltip */}
                <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {group.name}
                </div>
              </div>
            ))}
          </div>

          {/* Add Server Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 transition-all duration-200 border-2 border-dashed border-blue-400 hover:border-blue-500"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          {/* Spacer */}
          <div className="flex-1"></div>

          {/* User Avatar at Bottom */}
          <div className="mt-auto">
            <Avatar className="w-12 h-12 ring-2 ring-gray-300 cursor-pointer hover:ring-blue-400 transition-all">
              <AvatarImage
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                alt="Nguyen"
              />
              <AvatarFallback className="bg-blue-500 text-white">
                N
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Sidebar - Text Channels */}
        <div
          className="w-72 border-r flex flex-col"
          style={{
            background: "linear-gradient(135deg, #f5f5e6 0%, #dce4f7 100%)",
          }}
        >
          {/* Sidebar Header */}
          <div className="h-12 p-4 border-b flex items-center justify-between">
            <div className="w-8"></div>
            <h2 className="font-semibold">Group {selectedGroup}</h2>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Text Channels Section */}
          <div className="p-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Text Channels
            </div>

            {/* Rules Channel */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Hash className="w-4 h-4 mr-2" />
                <span className="text-sm">Rules</span>
              </Button>
            </div>

            {/* Forum Channel */}
            <div className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <span className="text-sm">Forum</span>
              </Button>
            </div>
          </div>

          {/* Spacer to push user profile to bottom */}
          <div className="flex-1"></div>

          {/* User Profile at Bottom */}
          <div className="h-16 border-t p-4 flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                      alt="Nguyen Van A"
                    />
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      NVA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    Nguyen Van A
                  </div>
                  <div className="text-xs text-muted-foreground">#1234</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-12 p-4 border-b flex items-center justify-between" style={{ background: "#e1e8f0" }}>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Rules</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Header action icons */}
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Users className="w-4 h-4" />
              </Button>
             
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Welcome Message */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Hash className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome to #Rules !</h2>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Messages */}
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {message.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {message.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-line leading-relaxed">
                      {message.content}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <span>3 replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="h-16 border-t p-4 flex items-center">
            <div className="flex items-center gap-2 w-full">
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Plus className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input placeholder="Enter messages" className="pr-10" />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                  >
                    <AtSign className="w-3 h-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Users và Search */}
        <div
          className="w-72 border-l-1  flex flex-col"
          style={{
            background: "#e1e8f0",
          }}
        >
          {/* Search Section */}
          <div className="h-12 p-4 border-b flex items-center">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search" className="pl-9" />
            </div>
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto">
            {/* Online Users */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Online
                </span>
                <span className="text-xs text-muted-foreground">
                  {mockUsers.filter((user) => user.status === "online").length}
                </span>
              </div>
              {mockUsers
                .filter((user) => user.status === "online")
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer mb-2 group"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-blue-500 text-white text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <span className="text-sm font-medium flex-1">{user.name}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <Video className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <UserPlus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Offline Users */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Offline
                </span>
                <span className="text-xs text-muted-foreground">
                  {mockUsers.filter((user) => user.status === "offline").length}
                </span>
              </div>
              {mockUsers
                .filter((user) => user.status === "offline")
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer mb-2 group"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gray-400 text-white text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-background"></div>
                    </div>
                    <span className="text-sm text-muted-foreground flex-1">
                      {user.name}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-6 h-6">
                        <UserPlus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}