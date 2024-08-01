import { PageWrapper } from "@/components/admin-navbar";
import { metadataHelper } from "@/lib/metadata";
import { BadRequestError } from "@/lib/error";
import { FetchData } from "./components/fetch-data";
interface AttributeByIdPageProps {
  params: { attributeId: string };
}
const AttributeByIdPage = ({ params }: AttributeByIdPageProps) => {
  const isNew = params.attributeId === "new";
  const title = `${isNew ? "สร้าง" : "แก้ไข"}คุณสมบัติสินค้า | Attribute`;

  //validate AttributeId is number
  const attributeId = isNew ? 0 : parseInt(params.attributeId);
  if (isNaN(attributeId)) throw new BadRequestError();

  return (
    <PageWrapper
      title={title}
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "/admin/attribute", title: "Attribute" },
        {
          href: "#",
          title: `${isNew ? "New" : "Edit"} Attribute`,
        },
      ]}
    >
      <FetchData attributeId={attributeId} title={title} isNew={isNew} />
    </PageWrapper>
  );
};

export default AttributeByIdPage;
export function generateMetadata({ params }: AttributeByIdPageProps) {
  const title = `${params.attributeId === "new" ? "สร้าง" : "แก้ไข"}คุณสมบัติสินค้า | Attribute`;
  return metadataHelper({
    title,
    description: "คุณสมบัติสินค้า",
  });
}
