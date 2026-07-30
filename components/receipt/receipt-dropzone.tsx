"use client";

import { FileText, ImageIcon, UploadCloud, X } from "lucide-react";

import { ChangeEvent, DragEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface ReceiptDropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ReceiptDropzone = ({
  file,
  onFileChange,
  disabled = false,
}: ReceiptDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const [dragging, setDragging] = useState(false);

  const validateFile = (selectedFile: File) => {
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      return "Upload a JPG, PNG, WEBP, or PDF file.";
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      return "File must be smaller than 10 MB.";
    }

    return null;
  };

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onFileChange(selectedFile);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setDragging(false);

    if (disabled) return;

    handleFile(event.dataTransfer.files?.[0]);
  };

  if (file) {
    const isPDF = file.type === "application/pdf";

    return (
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          {isPDF ? (
            <FileText className="size-5 text-muted-foreground" />
          ) : (
            <ImageIcon className="size-5 text-muted-foreground" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>

          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={disabled}
          onClick={() => {
            setError(null);
            onFileChange(null);
          }}
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        hidden
        disabled={disabled}
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition-colors",
          dragging
            ? "border-primary bg-primary/5"
            : "hover:border-primary/50 hover:bg-muted/40",
          disabled ? "pointer-events-none opacity-50" : "",
        ].join(" ")}
      >
        <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted">
          <UploadCloud className="size-5 text-muted-foreground" />
        </div>

        <p className="text-sm font-medium">Drop your receipt here</p>

        <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>

        <p className="mt-4 text-xs text-muted-foreground">
          JPG, PNG, WEBP or PDF · Max 10 MB
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default ReceiptDropzone;
