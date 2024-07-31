"use client";

import { Form } from "@/components/ui/form";
import { FieldErrors, useForm } from "react-hook-form";
import {
  categorySchema,
  CategorySchema,
} from "../../components/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInputField } from "@/components/custom-form-fields";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Category } from "@prisma/client";
import { useState } from "react";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { toast } from "react-toastify";
import { ParentCategorySelectField } from "./parent-category-select-field";
import {
  createNewCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
} from "../../components/category-action";
import { useRouter } from "next/navigation";
import { LoadingBars } from "@/components/ui/loading-bars";

interface CategoryFormProps {
  isNew?: boolean;
  title: string;
  initialData: Category | null;
  parentCategories: Category[];
}
export const CategoryForm = ({
  title,
  isNew,
  initialData,
  parentCategories,
}: CategoryFormProps) => {
  const {
    form,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    loading,
    onDelete,
    onSubmit,
    router,
  } = useCategoryForm({
    initialData,
  });

  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        title="ยืนยันการลบหมวดหมู่"
        description="การลบหมวดหมู่จะไม่สามารถย้อนกลับได้ คุณแน่ใจหรือไม่ที่จะลบหมวดหมู่นี้"
        loading={loading}
        onDelete={onDelete}
      />
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold md:text-3xl">{title}</h1>
        {isNew ? null : (
          <Button
            size="sm"
            onClick={() => setOpenDeleteConfirm(true)}
            variant="destructive"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => onSubmit(data, isNew),
            onSubmitError,
          )}
          className="flex max-w-lg flex-col space-y-4"
        >
          <CustomInputField
            control={form.control}
            name="name"
            label="ชื่อหมวดหมู่สินค้า"
          />
          <ParentCategorySelectField
            form={form}
            parentCategories={parentCategories}
          />
          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/category")}
              disabled={loading}
              type="button"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

const useCategoryForm = ({ initialData }: { initialData: Category | null }) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      isChild: initialData?.parentId ? true : false,
      parentId: initialData?.parentId?.toString() || undefined,
    },
  });
  const onDelete = async () => {
    if (!initialData) return;
    setLoading(true);
    const { error } = await deleteCategoryAction({ id: initialData.id });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่");
      setLoading(false);
      return;
    }
    toast.success("ลบหมวดหมู่สำเร็จ");
    setLoading(false);
    router.push("/admin/category");
    router.refresh();
  };
  const onSubmit = async (data: CategorySchema, isNew: boolean | undefined) => {
    setLoading(true);

    if (isNew) {
      const { error, category } = await createNewCategoryAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างหมวดหมู่");
        return;
      }
      toast.success("สร้างหมวดหมู่สำเร็จ");
      router.push(`/admin/category/${category.id}`);
      router.refresh();
      return;
    }
    if (!initialData) {
      toast.error("ไม่พบข้อมูลหมวดหมู่");
      return;
    }

    //validate that if it is child then parent Id is not it's own id
    if (data.isChild && data.parentId === initialData.id.toString()) {
      toast.error("ไม่สามารถเลือกหมวดหมู่เดียวกันเป็นหมวดหมู่หลัก");
      setLoading(false);
      return;
    }

    const { error, category } = await editCategoryAction({
      data,
      id: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่");
      return;
    }
    toast.success("แก้ไขหมวดหมู่สำเร็จ");
    router.push(`/admin/category/${category.id}`);
    router.refresh();
    return;
  };
  return {
    form,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    loading,
    onDelete,
    onSubmit,
    router,
  };
};
const onSubmitError = (error: FieldErrors<CategorySchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
