"use client";

import Link from "next/link";
import { useDashboardMe } from "@/hooks/use-dashboard";
import Avatar from "./avatar";
import { Button } from "../ui/button";

const Startup = () => {
  const { data: me } = useDashboardMe();
  console.log("me", me);
  return (
    <div className="flex items-center gap-2">
      <Button
        nativeButton={false}
        render={<Link href="/sign-up">Get started</Link>}
      />
      {me ? (
        <Avatar {...me} />
      ) : (
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/sign-in">Sign in</Link>}
        />
      )}
    </div>
  );
};

export default Startup;
