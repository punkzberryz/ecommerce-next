import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z
    .string()
    .min(6, { message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }),
});
export type SignInSchema = z.infer<typeof signInSchema>;
