import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อหมวดหมู่สินค้า" }),
  parentId: z.string().optional(),
  isChild: z.boolean().default(false),
});
export type CategorySchema = z.infer<typeof categorySchema>;
