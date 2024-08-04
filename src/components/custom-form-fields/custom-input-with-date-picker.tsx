"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Popover } from "@radix-ui/react-popover";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { CalendarUi } from "../calendar-ui";
import { formatDateToThaiDate } from "@/lib/format/format-date";

import { FieldTip } from "./field-tip";

export const CustomInputWithDatePickerField = <
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
          <div className="flex items-end space-x-2 pb-1">
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
          <FormControl>
            <div className="relative">
              <Input {...field} {...inputProps} required={required} />
              <div className="absolute -bottom-1 right-2.5 top-1/2 -translate-y-1/2">
                <CalendarPopover
                  onSelect={(d) => {
                    field.onChange(
                      formatDateToThaiDate(d, { format: "dd-LL-yyyy" }),
                    );
                  }}
                />
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const CalendarPopover = ({ onSelect }: { onSelect: (date: Date) => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" className="h-fit w-fit p-1" variant="outline">
          <CalendarIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarUi
          date={date}
          setDate={(d) => {
            setDate(d);
            if (d) onSelect(d);
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
