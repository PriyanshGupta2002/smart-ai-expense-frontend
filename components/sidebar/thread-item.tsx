"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import type { Thread } from "@/types/thread";

import {
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";

import { useDeleteThread, useUpdateThread } from "@/hooks/use-threads";

interface ThreadItemProps {
  thread: Thread;
  active: boolean;
}

const ThreadItem = ({ thread, active }: ThreadItemProps) => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(thread.title ?? "");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutateAsync: updateThread, isPending: isUpdating } =
    useUpdateThread();

  const { mutateAsync: deleteThread, isPending: isDeleting } =
    useDeleteThread();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const startEditing = () => {
    setTitle(thread.title ?? "");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setTitle(thread.title ?? "");
    setIsEditing(false);
  };

  const handleRename = async () => {
    const newTitle = title.trim();
    const currentTitle = thread.title ?? "";

    if (!newTitle) {
      cancelEditing();
      return;
    }

    if (newTitle === currentTitle) {
      setIsEditing(false);
      return;
    }

    try {
      await updateThread({
        threadId: thread.id,
        title: newTitle,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to rename thread:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteThread(thread.id);

      setDeleteOpen(false);

      if (active) {
        router.replace("/chat");
      }
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  };

  return (
    <>
      <SidebarMenuItem>
        {isEditing ? (
          <div className="flex h-8 items-center px-2">
            <Input
              ref={inputRef}
              value={title}
              disabled={isUpdating}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => {
                if (!isUpdating) {
                  void handleRename();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();

                  void handleRename();
                }

                if (event.key === "Escape") {
                  event.preventDefault();

                  cancelEditing();
                }
              }}
              className="h-7 px-2 text-sm"
            />

            {isUpdating && (
              <Loader2 className="ml-2 size-3.5 shrink-0 animate-spin text-muted-foreground" />
            )}
          </div>
        ) : (
          <>
            <SidebarMenuButton
              render={
                <Link href={`/chat/${thread.id}`}>
                  <MessageSquare />

                  <span className="truncate">{thread.title ?? "New chat"}</span>
                </Link>
              }
              isActive={active}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                }
              />

              <DropdownMenuContent side="right" align="start">
                <DropdownMenuItem onClick={startEditing}>
                  <Pencil />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </SidebarMenuItem>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-foreground">
                {thread.title ?? "this chat"}
              </span>{" "}
              and its messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault();

                void handleDelete();
              }}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ThreadItem;
