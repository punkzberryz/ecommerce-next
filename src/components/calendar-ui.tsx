import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { th } from "date-fns/locale";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";

interface Props {
  setDate: (date: Date | undefined) => void;
  date: Date | undefined;
}

const formatCaption: DateFormatter = (date, options) => {
  const y = date.getFullYear() + 543;
  const m = format(date, "LLLL", { locale: options?.locale });
  return `${m} ${y}`;
};
//Adding react-day-picker with Calendar
export function CalendarUi({ date, setDate }: Props) {
  return (
    <Calendar
      locale={th}
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-fit rounded-md border"
      formatters={{ formatCaption }}
    />
  );
}
