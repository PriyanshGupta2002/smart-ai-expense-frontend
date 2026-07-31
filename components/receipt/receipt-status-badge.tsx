import { Check, Clock3, LoaderCircle, TriangleAlert, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface ReceiptStatusBadgeProps {
  status: string;
}

const ReceiptStatusBadge = ({ status }: ReceiptStatusBadgeProps) => {
  switch (status) {
    case "PENDING":
      return (
        <Badge variant="secondary">
          <Clock3 className="size-3" />
          Queued
        </Badge>
      );

    case "PROCESSING":
      return (
        <Badge variant="secondary">
          <LoaderCircle className="size-3 animate-spin" />
          Processing
        </Badge>
      );

    case "COMPLETED":
      return (
        <Badge variant="outline">
          <Check className="size-3" />
          Completed
        </Badge>
      );

    case "NEEDS_REVIEW":
      return (
        <Badge variant="secondary">
          <TriangleAlert className="size-3" />
          Review
        </Badge>
      );

    case "FAILED":
      return (
        <Badge variant="destructive">
          <X className="size-3" />
          Failed
        </Badge>
      );

    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default ReceiptStatusBadge;
