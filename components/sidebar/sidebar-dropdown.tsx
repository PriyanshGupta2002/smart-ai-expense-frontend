"use client";

import { ChevronUp, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/use-auth";

interface SidebarFooterProps {
  first_name: string;
  last_name: string;
  email: string;
}

const SidebarAvatar = ({
  first_name,
  last_name,
  email,
}: SidebarFooterProps) => {
  const initials =
    `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();

  const { mutate: logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-full outline-none"
        render={
          <button className="flex w-full items-center gap-3 rounded-xl border p-2 transition-colors hover:bg-accent">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {initials}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium">
                {first_name} {last_name}
              </p>

              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>

            <ChevronUp className="size-4 text-muted-foreground" />
          </button>
        }
      />

      <DropdownMenuContent align="start" side="top" className="mb-2 w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="/settings/profile" />}
            className="cursor-pointer"
          >
            <User className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/settings/preferences" />}
            className="cursor-pointer"
          >
            <Settings className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-destructive"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            disabled={isPending}
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarAvatar;
