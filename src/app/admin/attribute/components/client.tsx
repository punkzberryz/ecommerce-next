"use client";

import { DataTable } from "@/components/table/data-table";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
import {
  AttributeWithParentName,
  getManyAttributeAction,
} from "./attribute-action";
import { attributeColumnDef } from "./attribute-column-def";

interface ClientProps {
  limit: number;
  initialData: { attributes: AttributeWithParentName[]; hasMore: boolean };
}
export const Client = ({ initialData, limit }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyAttributesAction", pageId, pageLimit, initialData],
    queryFn: () => getManyAttributes({ pageId: pageId, limit: pageLimit }),
    refetchOnMount: false,
    // placeholderData: keepPreviousData,
    initialData,
  });
  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  //prefetch next page
  useEffect(() => {
    if (!isPlaceholderData && data.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["getManyAttributesAction", pageId + 1],
        queryFn: () =>
          getManyAttributes({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable data={data.attributes} columns={attributeColumnDef} />
      <div className="items-cente mt-5 flex justify-end space-x-6">
        <TablePageLimit setPageLimit={setPageLimit} />
        <TablePaginationButtons
          hasMore={data.hasMore}
          pageId={pageId}
          setPageId={setPageId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </div>
  );
};
const getManyAttributes = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { attributes, error } = await getManyAttributeAction({ pageId, limit });
  if (error) {
    throw new Error(error.message);
  }
  return { attributes, hasMore: attributes.length === limit };
};
