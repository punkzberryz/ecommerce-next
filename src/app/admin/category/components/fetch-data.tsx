import { Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { CategoryWithParentName } from "./category-action";
import { Client } from "./client";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchCategories />
    </Suspense>
  );
};

const FetchCategories = async () => {
  const categoriesReq = db.category.findMany({
    where: {
      parentId: {
        equals: null,
      },
    },
    include: {
      children: true,
    },
    orderBy: {
      id: "desc",
    },
    skip: (CATEGORIES_PAGE_ID - 1) * CATEGORIES_LIMIT,
    take: CATEGORIES_LIMIT,
  });
  const userReq = validateRequest();
  const [categories, { user }] = await Promise.all([categoriesReq, userReq]);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  const allCategories: CategoryWithParentName[] = [];
  categories.forEach((parent) => {
    allCategories.push(parent);
    allCategories.push(
      ...parent.children.map((child) => ({
        ...child,
        parentName: parent.name,
      })),
    );
  });
  const hasMore = categories.length === CATEGORIES_LIMIT;

  return (
    <div className="flex flex-col space-y-2">
      <Client
        initialData={{
          categories: allCategories,
          hasMore,
        }}
        limit={CATEGORIES_LIMIT}
      />
    </div>
  );
};
const CATEGORIES_LIMIT = 100;
const CATEGORIES_PAGE_ID = 1;
