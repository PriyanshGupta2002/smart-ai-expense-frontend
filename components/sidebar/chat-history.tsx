"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { useThreads } from "@/hooks/use-threads";

import ThreadItem from "./thread-item";

const ChatHistory = () => {
  const params = useParams();

  const activeThread = params.threadId as string | undefined;

  const { data, isLoading } = useThreads();

  const threads = data?.threads ?? [];

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>

        <Button
          variant="ghost"
          size="icon"
          render={
            <Link href="/chat">
              <Plus className="size-4" />
            </Link>
          }
          nativeButton={false}
          className="size-7"
        />
      </div>

      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading
            ? null
            : threads.map((thread) => (
                <ThreadItem
                  key={thread.id}
                  thread={thread}
                  active={activeThread === thread.id}
                />
              ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ChatHistory;
