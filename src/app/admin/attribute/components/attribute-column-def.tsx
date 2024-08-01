"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  AttributeWithParentName,
  deleteAttributeAction,
} from "./attribute-action";
import Link from "next/link";
import {
  ColumnDeleteButton,
  ColumnEditButton,
} from "@/components/table/column-edit-and-delete-buttons";

export const attributeColumnDef: ColumnDef<AttributeWithParentName>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="id" column={column} />,
    accessorKey: "id",
    size: 20,
    cell: ({ row }) => (
      <Link href={`/admin/attribute/${row.original.id}`}>
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: "parentName",
    header: "ชื่อหัวข้อหลัก",
    cell: ({ row }) => (
      <Link
        href={`/admin/attribute/${row.original.parentId ?? row.original.id}`}
        className={row.original.parentId ? "text-primary underline" : ""}
      >
        {row.original.parentName || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: "ชื่อคุณสมบัติ",
    cell: ({ row }) => (
      <Link
        href={`/admin/attribute/${row.original.id}`}
        className={row.original.parentId ? "" : "text-primary underline"}
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => (
      <ColumnEditButton href={`/admin/attribute/${row.original.id}`} />
    ),
    size: 40,
  },
  {
    header: "ลบ",
    accessorKey: "delete",
    cell: ({ row }) => (
      <ColumnDeleteButton
        name={row.original.name}
        deleteAction={() => deleteAttributeAction({ id: row.original.id })}
      />
    ),
    size: 40,
  },
];
