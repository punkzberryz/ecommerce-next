import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { CategoryForm } from "./category-form";
import { db } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";

interface FetchDataProps {
  isNew?: boolean;
  categoryId: number;
  title: string;
}
export const FetchData = ({ categoryId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync categoryId={categoryId} title={title} isNew={isNew} />
    </Suspense>
  );
};

async function FetchDataAsync({ categoryId, title, isNew }: FetchDataProps) {
  //fetch all categories
  const parentCategoriesReq = db.category.findMany({
    where: {
      parentId: {
        equals: null,
      },
    },
  });
  //fetch categoryById
  const categoryReq = isNew
    ? null
    : db.category.findUnique({
        where: {
          id: categoryId,
        },
      });
  //validate user
  const userReq = validateRequest();
  const [parentCategories, category, { user }] = await Promise.all([
    parentCategoriesReq,
    categoryReq,
    userReq,
  ]);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  return (
    <CategoryForm
      initialData={category}
      isNew={isNew}
      parentCategories={parentCategories}
      title={title}
    />
  );
}
function FetchDataSkeleton({
  title,
  isNew,
}: {
  title: string;
  isNew?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Skeleton className="font-semibold text-transparent md:text-3xl">
          {title}
        </Skeleton>
        {isNew ? null : <Skeleton className="h-10 w-10" />}
      </div>
      <Skeleton className="h-20" />
    </div>
  );
}
