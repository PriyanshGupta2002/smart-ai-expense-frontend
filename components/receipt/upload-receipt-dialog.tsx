"use client";

import { useState } from "react";
import { Loader2, Plus, ReceiptText } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReceiptDropzone from "./receipt-dropzone";

import { useUploadReceipt } from "@/hooks/use-receipts";

const UploadReceiptDialog = () => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync, isPending, isError, error } = useUploadReceipt();

  const reset = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await mutateAsync(file);

      reset();
      setOpen(false);
    } catch {
      // Mutation exposes the error.
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;

    setOpen(nextOpen);

    if (!nextOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="size-4" />
            Upload receipt
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <ReceiptText className="size-5 text-primary" />
          </div>

          <DialogTitle>Upload receipt</DialogTitle>

          <DialogDescription>
            Upload an image or PDF and we&apos;ll extract the expense details
            automatically.
          </DialogDescription>
        </DialogHeader>

        <ReceiptDropzone
          file={file}
          onFileChange={setFile}
          disabled={isPending}
        />

        {isError && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-sm text-destructive">{getErrorMessage(error)}</p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!file || isPending}
            onClick={handleUpload}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ReceiptText className="size-4" />
                Upload receipt
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }

  return "Unable to upload receipt. Please try again.";
};

export default UploadReceiptDialog;
