/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { ContentWrapper, PageWrapper } from './Channel.styled';
import { IoNotifications } from 'react-icons/io5';
import { sampleData, SampleData } from './sample-data';
import ThreadPanel from '@/app/components/custom/RightPanel/ThreadPanel/ThreadPanel';
import CodeList from '@/app/components/custom/RightPanel/CodeList/CodeList';
import MemberList from '@/app/components/custom/RightPanel/MemberList/MemberList';
import MainBg from '@/app/components/custom/MainBackground/MainBg';
import SidebarMenu from '@/app/components/custom/Sidebar/Sidebar';
import CenterPanel from '@/app/components/custom/CenterPanel/CenterPanel';
import HeaderBar from '@/app/components/custom/UserHeader/UserHeader';

export const ChatChannel: React.FC = () => {
  const data: SampleData = sampleData();

  const [activeSection, setActiveSection] = useState<any>("");
  const [channelSelected, setChannelSelected] = useState<any>("");
  const [iconSelected, setIconSelected] = useState<any>("");
  const [grNameSelected, setGrNameSelected] = useState<any>("");


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
        return (
          <MemberList />
        );
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
            channelSelected={channelSelected}
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
  )
}
