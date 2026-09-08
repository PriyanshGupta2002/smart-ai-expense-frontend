"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Smartphone,
  Unplug,
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { WhatsappModal } from "./whatsapp-modal";

import {
  useDisconnectWhatsapp,
  useWhatsappConnection,
  useWhatsappStatus,
} from "@/hooks/use-whatsapp";

export const WhatsappConnections = () => {
  const { data: status, isLoading: statusLoading } = useWhatsappStatus();

  const { mutateAsync: connect, isPending: isConnecting } =
    useWhatsappConnection();

  const { mutateAsync: disconnect, isPending: isDisconnecting } =
    useDisconnectWhatsapp();

  const [qr, setQr] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const isConnected = status?.connected ?? false;

  const connectToWhatsapp = async () => {
    try {
      setModalOpen(true);
      setQr(null);

      const data = await connect();

      console.log("data", data);

      if (data?.qr?.qrCode) {
        setQr(data.qr.qrCode);
      }
    } catch (error) {
      console.error("Error connecting to WhatsApp:", error);

      setModalOpen(false);
      setQr(null);
    }
  };

  const disconnectFromWhatsapp = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting WhatsApp:", error);
    }
  };

  if (statusLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking WhatsApp connection...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
              <MessageCircle className="h-5 w-5 text-green-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">WhatsApp</h3>

                {isConnected && (
                  <Badge variant="secondary" className="gap-1 text-green-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected
                  </Badge>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                Send your expense summaries and reports directly to WhatsApp.
              </p>

              {isConnected && status?.phone_number && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Smartphone className="h-3.5 w-3.5" />+{status.phone_number}
                </p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Button
                variant="outline"
                onClick={disconnectFromWhatsapp}
                disabled={isDisconnecting}
                className="text-destructive hover:text-destructive"
              >
                {isDisconnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Disconnecting...
                  </>
                ) : (
                  <>
                    <Unplug className="mr-2 h-4 w-4" />
                    Disconnect
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={connectToWhatsapp} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <WhatsappModal
        open={modalOpen && !isConnected}
        onOpenChange={(open) => {
          if (!open) {
            setModalOpen(false);
            setQr(null);
          }
        }}
        qr={qr}
        isLoading={isConnecting}
      />
    </>
  );
};
