import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้า" }),
  description: z
    .string()
    .min(1, { message: "กรุณากรอกคำบรรยายสินค้า" })
    .max(255, {
      message: "คำบรรยายสินค้าต้องไม่เกิน 255 ตัวอักษร",
    }),
  quantity: z.number().int().min(0, { message: "กรุณากรอกจำนวนสินค้า" }),
  categoryId: z.string().min(1, { message: "กรุณาเลือกหมวดหมู่สินค้า" }),
  attributeIds: z.array(z.string()).default([]),
  price: z
    .string()
    .min(1, { message: "กรุณากรอกราคาสินค้า" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "ทศนิยมต้องไม่เกิน 2 หลัก เช่น 10.99",
    }),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  images: z.object({ url: z.string() }).array(),
});
export type ProductSchema = z.infer<typeof productSchema>;
