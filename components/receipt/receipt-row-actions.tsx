"use client";

import { ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ReceiptListItem } from "@/types/receipt";

import DeleteReceiptDialog from "./delete-receipt-dialog";

import { useState } from "react";

interface ReceiptRowActionsProps {
  receipt: ReceiptListItem;
}

const ReceiptRowActions = ({ receipt }: ReceiptRowActionsProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const viewReceipt = () => {
    if (!receipt.image_url) return;

    window.open(receipt.image_url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />

              <span className="sr-only">Receipt actions</span>
            </Button>
          }
        />

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem disabled={!receipt.image_url} onClick={viewReceipt}>
            <ExternalLink />
            View receipt
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteReceiptDialog
        receipt={receipt}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
};

export default ReceiptRowActions;
