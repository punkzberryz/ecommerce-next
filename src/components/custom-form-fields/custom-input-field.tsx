import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FieldTip } from "./field-tip";
import React from "react";
import { formatPhoneNumber } from "@/lib/format/format-phone";

export const CustomInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  fieldTipChildren,
  ...inputProps
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
} & InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-end space-x-2 overflow-x-clip pb-1">
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
          <FormControl>
            <Input {...field} {...inputProps} required={required} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const CustomPhoneInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  fieldTipChildren,
  ...inputProps
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
} & InputProps) => {
  const [value, setValue] = React.useState("");
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: string) => void,
  ) => {
    const unformattedNumber = event.target.value.replace(/\D/g, "");
    const formattedNumber = formatPhoneNumber(unformattedNumber);
    setValue(formattedNumber);
    fieldOnChange(unformattedNumber);
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
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
          <FormControl>
            <Input
              value={value}
              onChange={(e) => handleChange(e, field.onChange)}
              maxLength={20}
              required={required}
              {...inputProps}
            />
          </FormControl>
          {field.value}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
