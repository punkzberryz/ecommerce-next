import { z } from "zod";

export const attributeSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อคุณสมบัติสินค้า" }),
  parentId: z.string().optional(),
  isChild: z.boolean().default(false),
});
export type AttributeSchema = z.infer<typeof attributeSchema>;
