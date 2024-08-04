import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { ProductForm } from "./product-form";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { FetchProductById } from "../../components/fetch-data";

interface FetchDataProps {
  isNew?: boolean;
  productId: number;
  title: string;
}
export const FetchData = ({ productId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync title={title} isNew={isNew} productId={productId} />
    </Suspense>
  );
};
async function FetchDataAsync({ productId, title, isNew }: FetchDataProps) {
  //fetch all categories and attributes
  const categoriesReq = db.category.findMany({
    where: {
      parentId: { not: null },
    },
  });
  const attributesReq = db.attribute.findMany({
    where: {
      parentId: { not: null },
    },
  });
  //fetch productById
  const productReq = isNew
    ? null
    : db.product.findUnique({
        where: { id: productId },
        include: {
          productImage: true,
          category: true,
          AttributesOnProducts: {
            include: {
              attribute: true,
            },
          },
        },
      });

  //validate user
  const userReq = validateRequest();
  const [productResponse, { user }, categories, attributes] = await Promise.all(
    [productReq, userReq, categoriesReq, attributesReq],
  );
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  const product: FetchProductById | null = productResponse
    ? {
        ...productResponse,
        attributes: productResponse.AttributesOnProducts.map((attr) => ({
          id: attr.attributeId,
          name: attr.attribute.name,
          parentId: attr.attribute.parentId,
        })),
        category: productResponse.category,
        productImages: productResponse.productImage,
      }
    : null;

  return (
    <ProductForm
      initialData={product}
      title={title}
      isNew={isNew}
      categories={categories}
      attributes={attributes}
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
