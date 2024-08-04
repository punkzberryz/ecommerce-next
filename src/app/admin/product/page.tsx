import { PageWrapper } from "@/components/admin-navbar";
import { buttonVariants } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { metadataHelper } from "@/lib/metadata";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FetchData } from "./components/fetch-data";

const ProductPage = () => {
  return (
    <PageWrapper
      title="สินค้า | Product"
      links={[
        { href: "/admin", title: "Dashboard" },
        { href: "#", title: "Product" },
      ]}
    >
      <div className="flex items-center justify-between">
        <CardTitle>รายการสินค้า</CardTitle>
        <Link href="/admin/product/new" className={buttonVariants({})}>
          <Plus className="h-4 w-4 md:mr-2" />
          <span className="hidden md:block">สร้างใหม่</span>
        </Link>
      </div>
      <FetchData />
    </PageWrapper>
  );
};

export default ProductPage;
export const metadata = metadataHelper({
  title: "สินค้า | Product",
  description: "สินค้า",
});
