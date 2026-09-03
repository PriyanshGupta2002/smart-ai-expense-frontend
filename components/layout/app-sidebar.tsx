"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  MessageSquareText,
  ReceiptText,
  Sparkles,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ChatHistory from "../sidebar/chat-history";
import Avatar from "../landing/avatar";
import Startup from "../landing/startup";
import SidebarAvatar from "../sidebar/sidebar-dropdown";
import { useDashboardMe } from "@/hooks/use-dashboard";
import { useLogout } from "@/hooks/use-auth";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Receipts",
    href: "/receipts",
    icon: ReceiptText,
  },
  {
    title: "Ask AI",
    href: "/chat",
    icon: MessageSquareText,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { data: me } = useDashboardMe();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex h-12 items-center gap-2 px-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Sparkles className="size-4 text-primary-foreground" />
          </div>

          <div>
            <p className="text-sm font-semibold">Expense AI</p>

            <p className="text-xs text-muted-foreground">
              Smart expense tracking
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                      isActive={active}
                      tooltip={item.title}
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <ChatHistory />
      </SidebarContent>

      <SidebarFooter>
        {me && (
          <SidebarAvatar
            first_name={me.first_name}
            last_name={me.last_name}
            email={me.email}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
