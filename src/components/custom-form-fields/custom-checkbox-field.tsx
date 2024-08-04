import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FieldTip } from "./field-tip";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
export const CustomCheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  fieldTipChildren,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="flex items-end space-x-2 overflow-x-clip">
            <FormLabel className="text-nowrap">
              {label}
              {required && (
                <span className="pl-1 text-xs font-semibold text-destructive">
                  *
                </span>
              )}
            </FormLabel>
            {fieldTipChildren && <FieldTip>{fieldTipChildren}</FieldTip>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const CustomCheckboxWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-end">
        <Label>{label}</Label>
      </div>
      <div className="flex flex-col space-y-4 rounded-md border p-6">
        {children}
      </div>
    </div>
  );
};
