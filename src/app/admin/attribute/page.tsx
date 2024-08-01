import { PageWrapper } from "@/components/admin-navbar";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { metadataHelper } from "@/lib/metadata";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./components/fetch-data";

const AttributePage = () => {
  return (
    <PageWrapper
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "#", title: "Attribute" },
      ]}
      title="คุณสมบัติ | Attribute"
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการคุณสมบัติสินค้า</CardTitle>
        <Link href="/admin/attribute/new" className={buttonVariants({})}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default AttributePage;
export const metadata = metadataHelper({
  title: "คุณสมบัติ | Attribute",
  description: "คุณสมบัติสินค้า",
});
