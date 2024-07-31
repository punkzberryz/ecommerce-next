import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FieldTip } from "./field-tip";
import { Textarea, TextareaProps } from "../ui/textarea";

export const CustomTextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  fieldTipChildren,
  ...textareaProps
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
} & TextareaProps) => {
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
            <Textarea {...field} {...textareaProps} required={required} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
