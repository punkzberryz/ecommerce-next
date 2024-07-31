import { PageWrapper } from "@/components/admin-navbar";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { metadataHelper } from "@/lib/metadata";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./components/fetch-data";

const CategoryPage = () => {
  return (
    <PageWrapper
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "#", title: "Category" },
      ]}
      title="หมวดหมู่ | Category"
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการหมวดหมู่สินค้า</CardTitle>
        <Link href="/admin/category/new" className={buttonVariants({})}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default CategoryPage;
export const metadata = metadataHelper({
  title: "หมวดหมู่ | Category",
  description: "หมวดหมู่สินค้า",
});
