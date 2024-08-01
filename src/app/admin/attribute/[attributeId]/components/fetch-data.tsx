import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { AttributeForm } from "./attribute-form";
interface FetchDataProps {
  isNew?: boolean;
  attributeId: number;
  title: string;
}
export const FetchData = ({ attributeId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync attributeId={attributeId} title={title} isNew={isNew} />
    </Suspense>
  );
};
async function FetchDataAsync({ attributeId, title, isNew }: FetchDataProps) {
  //fetch all attributes
  const parentAttributesReq = db.attribute.findMany({
    where: {
      parentId: {
        equals: null,
      },
    },
  });
  //fetch attributeById
  const attributeReq = isNew
    ? null
    : db.attribute.findUnique({
        where: {
          id: attributeId,
        },
      });
  //validate user
  const userReq = validateRequest();
  const [parentAttributes, attribute, { user }] = await Promise.all([
    parentAttributesReq,
    attributeReq,
    userReq,
  ]);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  return (
    <AttributeForm
      initialData={attribute}
      isNew={isNew}
      parentAttributes={parentAttributes}
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
