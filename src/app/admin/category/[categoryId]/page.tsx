import { PageWrapper } from "@/components/admin-navbar";
import { metadataHelper } from "@/lib/metadata";
import { FetchData } from "./components/fetch-data";
import { BadRequestError } from "@/lib/error";

interface CategoryByIdPageProps {
  params: { categoryId: string };
}
const CategoryByIdPage = ({ params }: CategoryByIdPageProps) => {
  const isNew = params.categoryId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}หมวดหมู่สินค้า | Category`;

  //validate categoryId is number
  const categoryId = isNew ? 0 : parseInt(params.categoryId);
  if (isNaN(categoryId)) throw new BadRequestError();

  return (
    <PageWrapper
      title={title}
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "/admin/category", title: "Category" },
        {
          href: "#",
          title: `${isNew ? "New" : "Edit"} Category`,
        },
      ]}
    >
      <FetchData categoryId={categoryId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};

export default CategoryByIdPage;

export function generateMetadata({ params }: CategoryByIdPageProps) {
  const title = `${params.categoryId === "new" ? "สร้าง" : "แก้ไข"}หมวดหมู่สินค้า | Category`;
  return metadataHelper({
    title,
    description: "หมวดหมู่สินค้า",
  });
}
