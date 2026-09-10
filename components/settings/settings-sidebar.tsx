"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { User, Wallet, Sparkles, BarChart3, Shield } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";

const items = [
  {
    title: "Profile",
    url: "/settings/profile",
    icon: User,
  },
  {
    title: "Preferences",
    url: "/settings/preferences",
    icon: Wallet,
  },

  {
    title: "Usage",
    url: "/settings/usage",
    icon: BarChart3,
  },
  {
    title: "Security",
    url: "/settings/security",
    icon: Shield,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r">
      <SidebarHeader className="px-4 py-4">
        <div>
          <h2 className="font-semibold">Settings</h2>
          <p className="text-muted-foreground text-xs">Manage your account</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>

          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  tooltip={item.title}
                  render={
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="w-full">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
