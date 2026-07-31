import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import type { ReceiptListItem } from "@/types/receipt";

import ReceiptRowActions from "./receipt-row-actions";
import ReceiptStatusBadge from "./receipt-status-badge";

interface ReceiptsTableProps {
  receipts: ReceiptListItem[];
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean;
}

const ReceiptsTable = ({
  receipts,
  isLoading,
  isError,
  isFetching,
}: ReceiptsTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Merchant</TableHead>

              <TableHead>Date</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Payment</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">Amount</TableHead>

              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <ReceiptTableSkeleton />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  Unable to load receipts.
                </TableCell>
              </TableRow>
            ) : receipts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  No receipts found.
                </TableCell>
              </TableRow>
            ) : (
              receipts.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  className={isFetching ? "opacity-70" : undefined}
                >
                  <TableCell>
                    {receipt.processing_status === "PENDING" ||
                    receipt.processing_status === "PROCESSING" ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    ) : (
                      <p className="max-w-[220px] truncate font-medium">
                        {receipt.merchant_name ?? "Unknown merchant"}
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {formatDate(receipt.purchase_datetime)}
                  </TableCell>

                  <TableCell>{formatCategory(receipt.expense_type)}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {formatPaymentMethod(receipt.payment_method)}
                  </TableCell>

                  <TableCell>
                    <ReceiptStatusBadge status={receipt.processing_status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {receipt.processing_status === "PENDING" ||
                    receipt.processing_status === "PROCESSING" ? (
                      <Skeleton className="ml-auto h-4 w-16" />
                    ) : (
                      <span className="font-medium tabular-nums">
                        {formatCurrency(receipt.total, receipt.currency)}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <ReceiptRowActions receipt={receipt} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ReceiptTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="size-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const formatDate = (value: string | null) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatCategory = (value: string | null) => {
  if (!value) return "Other";

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatPaymentMethod = (value: string | null) => {
  if (!value) return "—";

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatCurrency = (amount: number | null, currency: string | null) => {
  if (amount === null) return "—";

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency ?? "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency ?? "₹"} ${amount}`;
  }
};

export default ReceiptsTable;
