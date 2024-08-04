"use client";

import { useRouter } from "next/navigation";
import { FetchProductById } from "../../components/fetch-data";
import { useState } from "react";
import { productSchema, ProductSchema } from "../../components/product-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createNewProductAction,
  deleteProductAction,
  editProductAction,
} from "../../components/product-action";
import { toast } from "react-toastify";

export const useProductForm = ({
  initialData,
}: {
  initialData: FetchProductById | null;
}) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      images: initialData?.productImages ?? [],
      categoryId: initialData?.categoryId?.toString() ?? "",
      isArchived: initialData?.isArchived ?? false,
      isFeatured: initialData?.isFeatured ?? false,
      price: initialData?.price?.toString() ?? "",
      quantity: initialData?.quantity ?? 0,
      attributeIds:
        initialData?.attributes.map((attr) => attr.id.toString()) ?? [],
    },
  });
  const onDelete = async () => {
    if (!initialData) return;
    setLoading(true);
    const { error } = await deleteProductAction({ id: initialData.id });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบสินค้า");
      return;
    }
    toast.success("ลบสินค้าสำเร็จ");
    router.push("/admin/product");
    router.refresh();
  };
  const onSubmit = async (data: ProductSchema, isNew: boolean | undefined) => {
    setLoading(true);

    if (isNew) {
      const { error, product } = await createNewProductAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างสินค้า");
        return;
      }
      toast.success("สร้างสินค้าสำเร็จ");
      router.push(`/admin/product/${product.id}`);
      router.refresh();
      return;
    }
    if (!initialData) {
      toast.error("ไม่พบข้อมูลสินค้า");
      return;
    }
    const { error, product } = await editProductAction({
      data,
      id: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า");
      return;
    }
    toast.success("แก้ไขสินค้าสำเร็จ");
    router.push(`/admin/product/${product.id}`);
    router.refresh();
    return;
  };

  return {
    loading,
    form,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    onDelete,
    onSubmit,
    router,
  };
};
