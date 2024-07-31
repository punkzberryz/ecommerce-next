import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  displayName: z
    .string()
    .min(1, { message: "ชื่อผู้ใช้ต้องมีอย่างน้อย 1 ตัวอักษร" }),
  password: z
    .string()
    .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  confirmPassword: z
    .string()
    .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
  adminSecret: z.string().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
