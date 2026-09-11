"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsappConnections } from "@/components/whatsapp";

import { AccountInformationCardProps } from "@/types/dashboard";
import { FC } from "react";

export const AccountInformationCard: FC<AccountInformationCardProps> = ({
  created_at,
  loading,
  connectionStatus,
  connectionStatusLoading,
  authorizationStatus,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-muted-foreground text-sm">Account Created</p>

          {loading ? (
            <Skeleton className="mt-1 h-5 w-32" />
          ) : (
            <p>{created_at}</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground text-sm">Subscription Plan</p>

          {loading ? <Skeleton className="mt-1 h-5 w-20" /> : <p>Free Plan</p>}
        </div>

        <div>
          <p className="text-muted-foreground text-sm">User ID</p>

          {loading ? (
            <Skeleton className="mt-1 h-5 w-36" />
          ) : (
            <p className="font-mono text-sm">usr_123456789</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground text-sm mb-2">Google Account</p>

          {connectionStatusLoading ? (
            <Skeleton className="h-9 w-40" />
          ) : !connectionStatus ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/connect`}
                >
                  Connect Google account
                </a>
              }
            />
          ) : authorizationStatus === "reauthorization_required" ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/reconnect`}
                >
                  Reconnect Google
                </a>
              }
            />
          ) : (
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Connected</Badge>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // disconnect
                }}
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
        <div>
          <span>Whatsapp</span>
          <WhatsappConnections />
        </div>
      </CardContent>
    </Card>
  );
};
