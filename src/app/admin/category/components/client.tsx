"use client";

import { DataTable } from "@/components/table/data-table";
import { categoryColumnDef } from "./category-column-def";
import {
  CategoryWithParentName,
  getManyCategoryAction,
} from "./category-action";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";

interface ClientProps {
  limit: number;
  initialData: { categories: CategoryWithParentName[]; hasMore: boolean };
}
export const Client = ({ initialData, limit }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyCategoriesAction", pageId, pageLimit, initialData],
    queryFn: () => getManyCategories({ pageId: pageId, limit: pageLimit }),
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
        queryKey: ["getManyCategoriesAction", pageId + 1],
        queryFn: () =>
          getManyCategories({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable data={data.categories} columns={categoryColumnDef} />
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
const getManyCategories = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { categories, error } = await getManyCategoryAction({ pageId, limit });
  if (error) {
    throw new Error(error.message);
  }
  return { categories, hasMore: categories.length === limit };
};
