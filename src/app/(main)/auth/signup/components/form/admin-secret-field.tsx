"use client";
import { UseFormReturn } from "react-hook-form";
import { SignUpSchema } from "./signup-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
export const AdminSecretField = ({
  form,
}: {
  form: UseFormReturn<SignUpSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="adminSecret"
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="absolute left-2.5 top-5 font-semibold text-gray-800 opacity-70 dark:text-gray-200">
            <span>Admin Secret</span>
            <span className="pl-1">(ไม่บังคับ / สำหรับแอดมิน)</span>
          </FormLabel>
          <FormControl>
            <Input {...field} type="password" className="pb-4 pt-12" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
