import { PageWrapper } from "@/components/admin-navbar";
import { BadRequestError } from "@/lib/error";
import { metadataHelper } from "@/lib/metadata";
import { FetchData } from "./components/fetch-data";

interface ProductByIdPageProps {
  params: { productId: string };
}
const ProductByIdPage = ({ params }: ProductByIdPageProps) => {
  const isNew = params.productId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}สินค้า | Product`;

  //validate productId is number
  const productId = isNew ? 0 : parseInt(params.productId);
  if (isNaN(productId)) throw new BadRequestError();

  return (
    <PageWrapper
      title={title}
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "/admin/product", title: "Product" },
        {
          href: "#",
          title: `${isNew ? "New" : "Edit"} Product`,
        },
      ]}
      options={{ hasMaxWidth: true }}
    >
      <FetchData productId={productId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};

export default ProductByIdPage;

export function generateMetadata({ params }: ProductByIdPageProps) {
  const title = `${params.productId === "new" ? "สร้าง" : "แก้ไข"}สินค้า | Product`;
  return metadataHelper({
    title,
    description: "หมวดหมู่สินค้า",
  });
}
