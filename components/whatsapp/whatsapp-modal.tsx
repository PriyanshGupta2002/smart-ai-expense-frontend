"use client";

import { Loader2, MessageCircle, Smartphone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WhatsappModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qr: string | null;
  isLoading?: boolean;
}

export const WhatsappModal = ({
  open,
  onOpenChange,
  qr,
  isLoading = false,
}: WhatsappModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <MessageCircle className="h-6 w-6 text-green-500" />
          </div>

          <DialogTitle className="text-xl">Connect WhatsApp</DialogTitle>

          <DialogDescription>
            Scan the QR code with WhatsApp on your phone to connect your
            account.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center">
          {/* QR */}
          <div className="relative flex h-[280px] w-[280px] items-center justify-center rounded-2xl border bg-white p-4 shadow-sm">
            {isLoading ? (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm">Generating QR code...</p>
              </div>
            ) : qr ? (
              <img
                src={qr}
                alt="WhatsApp QR code"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-center text-sm text-muted-foreground">
                QR code is not available.
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 w-full rounded-xl bg-muted/50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background">
                <Smartphone className="h-4 w-4" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">How to connect</p>

                <ol className="space-y-1 text-sm text-muted-foreground">
                  <li>1. Open WhatsApp on your phone.</li>
                  <li>2. Go to Settings → Linked Devices.</li>
                  <li>3. Tap &quot;Link a Device&quot;.</li>
                  <li>4. Scan the QR code above.</li>
                </ol>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Keep this window open while connecting.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
