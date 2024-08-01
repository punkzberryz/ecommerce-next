import { Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Client } from "./client";
import { AttributeWithParentName } from "./attribute-action";
export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchAttributes />
    </Suspense>
  );
};
const FetchAttributes = async () => {
  const attributesReq = db.attribute.findMany({
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
    skip: (ATTRIBUTES_PAGE_ID - 1) * ATTRIBUTES_LIMIT,
    take: ATTRIBUTES_LIMIT,
  });
  const userReq = validateRequest();
  const [attributes, { user }] = await Promise.all([attributesReq, userReq]);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  const allAttributes: AttributeWithParentName[] = [];
  attributes.forEach((parent) => {
    allAttributes.push(parent);
    allAttributes.push(
      ...parent.children.map((child) => ({
        ...child,
        parentName: parent.name,
      })),
    );
  });
  const hasMore = attributes.length === ATTRIBUTES_LIMIT;
  return (
    <div className="flex flex-col space-y-2">
      <Client
        initialData={{
          attributes: allAttributes,
          hasMore,
        }}
        limit={ATTRIBUTES_LIMIT}
      />
    </div>
  );
};
const ATTRIBUTES_LIMIT = 100;
const ATTRIBUTES_PAGE_ID = 1;
