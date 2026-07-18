"use client";

import { ChevronRightIcon } from "lucide-react";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            className="group/collapsible"
            key={item.title}
            open={item.isActive}
            render={<SidebarMenuItem />}
          >
            <CollapsibleTrigger
              onClick={() => {
                window.location.hash = item.url;
              }}
              render={
                <SidebarMenuButton
                  isActive={item.isActive}
                  tooltip={item.title}
                />
              }
            >
              {item.icon}
              <span>{item.title}</span>
              <ChevronRightIcon className="ml-auto transition-transform duration-200" />
            </CollapsibleTrigger>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
