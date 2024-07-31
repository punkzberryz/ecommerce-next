"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface TablePageLimitProps {
  setPageLimit: (pageLimit: number) => void;
}
export const TablePageLimit = ({ setPageLimit }: TablePageLimitProps) => {
  return (
    <div className="flex items-center space-x-2">
      <p>จำนวนต่อหน้า</p>
      <Select
        onValueChange={(value) => {
          setPageLimit(Number(value));
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue
            defaultValue={pageOptions[2]}
            placeholder={pageOptions[2]}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageOptions.map((page) => (
              <SelectItem key={page} value={String(page)}>
                {page}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
const pageOptions = [1000, 500, 100, 50, 20, 10];
