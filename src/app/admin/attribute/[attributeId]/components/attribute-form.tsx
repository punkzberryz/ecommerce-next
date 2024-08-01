"use client";

import { CustomInputField } from "@/components/custom-form-fields";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Attribute } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  attributeSchema,
  AttributeSchema,
} from "../../components/attribute-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingBars } from "@/components/ui/loading-bars";
import { ParentAttributeSelectField } from "./parent-attribute-select-field";
import {
  createNewAttributeAction,
  deleteAttributeAction,
  editAttributeAction,
} from "../../components/attribute-action";

interface AttributeFormProps {
  isNew?: boolean;
  title: string;
  initialData: Attribute | null;
  parentAttributes: Attribute[];
}
export const AttributeForm = ({
  title,
  isNew,
  initialData,
  parentAttributes,
}: AttributeFormProps) => {
  const {
    form,
    loading,
    openDeleteConfirm,
    router,
    setOpenDeleteConfirm,
    onDelete,
    onSubmit,
  } = useAttributeForm({ initialData });
  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        title="ยืนยันการลบคุณสมบัติ"
        description="การลบคุณสมบัติจะไม่สามารถย้อนกลับได้ คุณแน่ใจหรือไม่ที่จะลบคุณสมบัตินี้"
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
            label="ชื่อคุณสมบัติสินค้า"
          />
          <ParentAttributeSelectField
            form={form}
            parentAttributes={parentAttributes}
          />
          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/attribute")}
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
const useAttributeForm = ({
  initialData,
}: {
  initialData: Attribute | null;
}) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<AttributeSchema>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: initialData?.name || "",
      isChild: initialData?.parentId ? true : false,
      parentId: initialData?.parentId?.toString() || undefined,
    },
  });
  const onDelete = async () => {
    if (!initialData) return;
    setLoading(true);
    const { error } = await deleteAttributeAction({ id: initialData.id });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบคุณสมบัติ");
      setLoading(false);
      return;
    }
    toast.success("ลบคุณสมบัติสำเร็จ");
    setLoading(false);
    router.push("/admin/attribute");
    router.refresh();
  };
  const onSubmit = async (
    data: AttributeSchema,
    isNew: boolean | undefined,
  ) => {
    setLoading(true);

    if (isNew) {
      const { error, attribute } = await createNewAttributeAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างคุณสมบัติ");
        return;
      }
      toast.success("สร้างคุณสมบัติสำเร็จ");
      router.push(`/admin/attribute/${attribute.id}`);
      router.refresh();
      return;
    }
    if (!initialData) {
      toast.error("ไม่พบข้อมูลคุณสมบัติ");
      return;
    }

    //validate that if it is child then parent Id is not it's own id
    if (data.isChild && data.parentId === initialData.id.toString()) {
      toast.error("ไม่สามารถเลือกคุณสมบัติเดียวกันเป็นคุณสมบัติหลัก");
      setLoading(false);
      return;
    }

    const { error, attribute } = await editAttributeAction({
      data,
      id: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการแก้ไขคุณสมบัติ");
      return;
    }
    toast.success("แก้ไขคุณสมบัติสำเร็จ");
    router.push(`/admin/attribute/${attribute.id}`);
    router.refresh();
    return;
  };
  return {
    router,
    form,
    loading,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    onDelete,
    onSubmit,
  };
};
const onSubmitError = (error: FieldErrors<AttributeSchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
