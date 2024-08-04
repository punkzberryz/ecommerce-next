"use client";

import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";
import { ProductSchema } from "../../components/product-schema";
import { FetchProductById } from "../../components/fetch-data";
import { LoadingBars } from "@/components/ui/loading-bars";
import {
  CustomInputField,
  CustomTextAreaField,
  CustomCheckboxField,
  CustomCheckboxWrapper,
  CustomSelectBoxField,
} from "@/components/custom-form-fields";
import { useMultipleImagesUploadReducer } from "@/components/image-input";
import { ImageField } from "./image-field";
import { useProductForm } from "./use-product-form";
import { Attribute, Category } from "@prisma/client";

interface ProductFormProps {
  isNew?: boolean;
  title: string;
  categories: Category[];
  attributes: Attribute[];
  initialData: FetchProductById | null;
}
export const ProductForm = ({
  initialData,
  title,
  isNew,
  attributes,
  categories,
}: ProductFormProps) => {
  const [imageFiles, imageDispatch] = useMultipleImagesUploadReducer();

  const {
    form,
    loading,
    onDelete,
    onSubmit,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    router,
  } = useProductForm({ initialData });

  useEffect(() => {
    const initState = initialData?.productImages.map((image) => ({
      getUrl: image.url,
      name: image.id,
      isError: false,
      isLoading: false,
    }));
    if (initState) {
      imageDispatch({ type: "SET_FILES", payload: { files: initState } });
    }
  }, [imageDispatch, initialData?.productImages]);

  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        title="ยืนยันการลบสินค้า"
        description="การลบสินค้าจะไม่สามารถย้อนกลับได้ คุณแน่ใจหรือไม่ที่จะลบสินค้านี้"
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => onSubmit(data, isNew),
            onSubmitError,
          )}
          className="flex flex-col gap-8 space-y-4"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CustomInputField
              control={form.control}
              name="name"
              label="ชื่อสินค้า"
            />
            <CustomInputField
              control={form.control}
              name="price"
              label="ราคา"
              type="number"
            />
            <CustomInputField
              control={form.control}
              name="quantity"
              label="จำนวนสินค้า"
              type="number"
              fieldTipChildren={
                <span className="text-sm text-gray-500">
                  จำนวนสินค้าในคลัง / สามารถแก้ไขได้ภายหลัง
                </span>
              }
              onChange={(e) => {
                form.setValue("quantity", parseInt(e.target.value));
              }}
            />
            <CustomSelectBoxField
              control={form.control}
              name="categoryId"
              label="หมวดหมู่สินค้า"
              options={categories.map((cat) => ({
                label: cat.name,
                value: cat.id.toString(),
              }))}
              emptyPlaceholder="ไม่พบหมวดหมู่สินค้า"
              placeholder="เลือกหมวดหมู่สินค้า..."
              inputPlaceholder="ค้นหาหมวดหมู่สินค้า"
            />
            <CustomSelectBoxField
              control={form.control}
              name="attributeIds"
              label="คุณสมบัติสินค้า"
              options={attributes.map((att) => ({
                label: att.name,
                value: att.id.toString(),
              }))}
              emptyPlaceholder="ไม่พบคุณสมบัติสินค้า"
              placeholder="เลือกคุณสมบัติสินค้า..."
              inputPlaceholder="ค้นหาคุณสมบัติสินค้า"
              multiple
            />
            <CustomCheckboxWrapper label="แสดงสินค้า">
              <CustomCheckboxField
                control={form.control}
                name="isFeatured"
                label="สินค้าแนะนำ"
                fieldTipChildren={
                  <span className="text-sm text-gray-500">
                    สินค้านี้จะแสดงเป็นสินค้าแนะนำในหน้าหลัก
                  </span>
                }
              />
              <CustomCheckboxField
                control={form.control}
                name="isArchived"
                label="ซ่อนสินค้า"
                fieldTipChildren={
                  <span className="text-sm text-gray-500">
                    สินค้าจะถูกซ่อนออกจากรายการสินค้าที่แสดงให้ลูกค้าเห็น
                    แต่ยังคงอยู่ในระบบเพื่อเก็บเป็นประวัติ
                  </span>
                }
              />
            </CustomCheckboxWrapper>
          </div>
          <CustomTextAreaField
            control={form.control}
            name="description"
            label="คำบรรยายสินค้า"
          />
          <ImageField imageState={imageFiles} imageDispatch={imageDispatch} />

          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/product")}
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

const onSubmitError = (error: FieldErrors<ProductSchema>) => {
  toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
};
