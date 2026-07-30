"use client";

import { useState } from "react";

import { useReceipts } from "@/hooks/use-receipts";

import ReceiptsTable from "./receipts-table";
import ReceiptsPagination from "./receipts-pagination";

const ReceiptsContainer = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError, isFetching } = useReceipts({
    page,
    pageSize,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Receipts</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your uploaded receipts.
          </p>
        </div>
      </div>

      <ReceiptsTable
        receipts={data?.items ?? []}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
      />

      {data && data.total_pages > 1 && (
        <ReceiptsPagination
          page={data.page}
          totalPages={data.total_pages}
          total={data.total}
          pageSize={data.page_size}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ReceiptsContainer;
