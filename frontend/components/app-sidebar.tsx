"use client";

import {
  AudioLinesIcon,
  BookOpenIcon,
  BotIcon,
  GalleryVerticalEndIcon,
  Settings2Icon,
  TerminalIcon,
  TerminalSquareIcon,
} from "lucide-react";
import type * as React from "react";
import { useEffect, useState } from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Playground", url: "#board", icon: <TerminalSquareIcon /> },
  { title: "Models", url: "#models", icon: <BotIcon /> },
  { title: "Documentation", url: "#docs", icon: <BookOpenIcon /> },
  { title: "Settings", url: "#settings", icon: <Settings2Icon /> },
];

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeHash, setActiveHash] = useState("#board");

  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash || "#board");
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const items = navItems.map((item) => ({
    ...item,
    isActive: activeHash === item.url,
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
