import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Attribute, Category, Product, ProductImage } from "@prisma/client";
import { Suspense } from "react";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchProducts />
    </Suspense>
  );
};
const FetchProducts = async () => {
  const productReq = db.product.findMany({
    orderBy: {
      id: "desc",
    },
    skip: (PRODUCTS_PAGE_ID - 1) * PRODUCTS_LIMIT,
    take: PRODUCTS_LIMIT,
    include: {
      productImage: true,
    },
  });
  const userReq = validateRequest();
  const [products, { user }] = await Promise.all([productReq, userReq]);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  const hasMore = products.length === PRODUCTS_LIMIT;
  return null;
};
const PRODUCTS_LIMIT = 100;
const PRODUCTS_PAGE_ID = 1;

export type FetchProductById = Product & { attributes: Attribute[] } & {
  category: Category | null;
} & { productImages: ProductImage[] };
