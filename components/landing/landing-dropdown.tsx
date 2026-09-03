import { LayoutDashboard, LogOut, UserCircle2 } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/use-auth";

interface LandingDropdownProps {
  first_name: string;
  last_name: string;
  email: string;
}

const LandingDropdown = ({
  first_name,
  last_name,
  email,
}: LandingDropdownProps) => {
  const initials =
    `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
  const { mutate: logout, isPending } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="outline-none"
        render={
          <Button className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            {initials}
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">
                  {first_name} {last_name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href="/dashboard" />}
            className="cursor-pointer"
          >
            <LayoutDashboard className="mr-2 size-4" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile" />}
            className="cursor-pointer"
          >
            <UserCircle2 className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            disabled={isPending}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LandingDropdown;
