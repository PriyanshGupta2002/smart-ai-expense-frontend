import { Badge } from "@/components/ui/badge";

interface ReceiptStatusBadgeProps {
  status: string;
}

const ReceiptStatusBadge = ({ status }: ReceiptStatusBadgeProps) => {
  const normalizedStatus = status.toUpperCase();

  if (normalizedStatus === "COMPLETED") {
    return (
      <Badge
        variant="secondary"
        className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400"
      >
        Completed
      </Badge>
    );
  }

  if (normalizedStatus === "PROCESSING") {
    return (
      <Badge
        variant="secondary"
        className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400"
      >
        Processing
      </Badge>
    );
  }

  if (normalizedStatus === "FAILED") {
    return <Badge variant="destructive">Failed</Badge>;
  }

  if (normalizedStatus === "PENDING") {
    return <Badge variant="outline">Pending</Badge>;
  }

  return <Badge variant="outline">{formatStatus(status)}</Badge>;
};

const formatStatus = (value: string) =>
  value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default ReceiptStatusBadge;
