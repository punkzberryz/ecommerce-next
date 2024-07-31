"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  CategoryWithParentName,
  deleteCategoryAction,
} from "./category-action";
import Link from "next/link";
import {
  ColumnDeleteButton,
  ColumnEditButton,
} from "@/components/table/column-edit-and-delete-buttons";

export const categoryColumnDef: ColumnDef<CategoryWithParentName>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="id" column={column} />,
    accessorKey: "id",
    size: 20,
    cell: ({ row }) => (
      <Link href={`/admin/category/${row.original.id}`}>{row.original.id}</Link>
    ),
  },
  {
    accessorKey: "parentName",
    header: "หมวดหมู่แม่",
    cell: ({ row }) => (
      <Link
        href={`/admin/category/${row.original.parentId ?? row.original.id}`}
      >
        {row.original.parentName || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "ชื่อหมวดหมู่",
    cell: ({ row }) => (
      <Link href={`/admin/category/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => (
      <ColumnEditButton href={`/admin/category/${row.original.id}`} />
    ),
    size: 40,
  },
  {
    header: "ลบ",
    accessorKey: "delete",
    cell: ({ row }) => (
      <ColumnDeleteButton
        name={row.original.name}
        deleteAction={() => deleteCategoryAction({ id: row.original.id })}
      />
    ),
    size: 40,
  },
];
