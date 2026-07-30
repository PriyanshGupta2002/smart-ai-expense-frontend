"use client";

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

import { useDeleteReceipt } from "@/hooks/use-receipts";

import type { ReceiptListItem } from "@/types/receipt";

interface DeleteReceiptDialogProps {
  receipt: ReceiptListItem;

  open: boolean;

  onOpenChange: (open: boolean) => void;
}

const DeleteReceiptDialog = ({
  receipt,
  open,
  onOpenChange,
}: DeleteReceiptDialogProps) => {
  const { mutate: deleteReceipt, isPending } = useDeleteReceipt();

  const handleDelete = () => {
    deleteReceipt(receipt.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete receipt?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete
            {receipt.merchant_name
              ? ` the receipt from ${receipt.merchant_name}`
              : " this receipt"}
            . This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReceiptDialog;
