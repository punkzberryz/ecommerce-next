import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FieldTip } from "./field-tip";

interface SelectOpnion {
  label: string;
  value: string;
}
export const CustomSelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  placeholder,
  required,
  fieldTipChildren,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  options: SelectOpnion[];
  placeholder?: string;
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-end space-x-2">
            <FormLabel>
              {label}
              {required && (
                <span className="pl-1 text-xs font-semibold text-destructive">
                  *
                </span>
              )}
            </FormLabel>
            {fieldTipChildren && <FieldTip>{fieldTipChildren}</FieldTip>}
          </div>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
