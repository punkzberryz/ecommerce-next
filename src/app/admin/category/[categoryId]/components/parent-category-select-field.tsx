"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { CategorySchema } from "../../components/category-schema";
import { useState } from "react";
import { Category } from "@prisma/client";
import { CustomSelectField } from "@/components/custom-form-fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const ParentCategorySelectField = ({
  form,
  parentCategories,
}: {
  form: UseFormReturn<CategorySchema>;
  parentCategories: Category[];
}) => {
  return (
    <>
      {/* Checkbox is child category? */}
      <div className="flex flex-col space-y-4 rounded-md border bg-primary/10 p-4 shadow-md">
        <FormField
          control={form.control}
          name="isChild"
          render={({ field }) => (
            <FormItem className="flex space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value);
                    if (!value) form.setValue("parentId", undefined);
                  }}
                />
              </FormControl>
              <FormLabel>เป็นหมวดหมู่ลูก ( Sub-Category )</FormLabel>
            </FormItem>
          )}
        />
        {form.watch("isChild") && (
          <CustomSelectField
            control={form.control}
            label="เลือกหมวดหมู่หลัก"
            name="parentId"
            options={parentCategories.map((category) => ({
              label: category.name,
              value: category.id.toString(),
            }))}
          />
        )}
      </div>
    </>
  );
};
