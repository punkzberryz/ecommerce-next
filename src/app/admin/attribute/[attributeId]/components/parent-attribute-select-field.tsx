"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Attribute, Category } from "@prisma/client";
import { CustomSelectField } from "@/components/custom-form-fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { AttributeSchema } from "../../components/attribute-schema";
export const ParentAttributeSelectField = ({
  form,
  parentAttributes,
}: {
  form: UseFormReturn<AttributeSchema>;
  parentAttributes: Attribute[];
}) => {
  return (
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
            <FormLabel>เป็นคุณสมบัติลูก ( Sub-Attribute )</FormLabel>
          </FormItem>
        )}
      />
      {form.watch("isChild") && (
        <CustomSelectField
          control={form.control}
          label="เลือกหัวข้อคุณสมบัติ"
          name="parentId"
          options={parentAttributes.map((attribute) => ({
            label: attribute.name,
            value: attribute.id.toString(),
          }))}
        />
      )}
    </div>
  );
};
