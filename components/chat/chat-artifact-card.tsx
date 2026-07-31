import { Download, File, FileSpreadsheet, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ChatArtifact } from "@/types/chat";

interface ChatArtifactCardProps {
  artifact: ChatArtifact;
}

const ChatArtifactCard = ({ artifact }: ChatArtifactCardProps) => {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {getFileIcon(artifact.mime_type)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{artifact.name}</p>

        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{getFileLabel(artifact.mime_type)}</span>

          {artifact.size ? (
            <>
              <span>•</span>
              <span>{formatFileSize(artifact.size)}</span>
            </>
          ) : null}
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        nativeButton={false}
        render={
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${artifact.name}`}
          />
        }
      >
        <Download className="size-4" />
      </Button>
    </div>
  );
};

const getFileIcon = (mimeType: string) => {
  if (mimeType === "text/csv" || mimeType.includes("spreadsheet")) {
    return <FileSpreadsheet className="size-5 text-primary" />;
  }

  if (mimeType === "application/pdf") {
    return <FileText className="size-5 text-primary" />;
  }

  return <File className="size-5 text-primary" />;
};

const getFileLabel = (mimeType: string) => {
  if (mimeType === "text/csv") {
    return "CSV";
  }

  if (mimeType === "application/pdf") {
    return "PDF";
  }

  if (mimeType.includes("spreadsheet")) {
    return "Excel";
  }

  return "File";
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

export default ChatArtifactCard;
