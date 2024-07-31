"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteConfirmModal } from "../delete-confirm-modal";

export const ColumnEditButton = ({ href }: { href: string }) => {
  return (
    <Button className="-my-2 h-8 rounded-md px-2" asChild variant="edit">
      <Link href={href}>
        <Pencil className="h-3 w-3" />
      </Link>
    </Button>
  );
};
export const ColumnDeleteButton = ({
  deleteAction,
  name,
}: {
  name: string;
  deleteAction: () => Promise<
    | {
        error?: undefined;
      }
    | {
        error: {
          message: string;
          code: number;
        };
      }
  >;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await deleteAction();
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบ");
      return;
    }
    router.refresh();
    toast.success("ลบรายการสำเร็จ");
    setOpen(false);
  };
  return (
    <>
      <Button
        className="-my-2 h-8 rounded-md px-2"
        onClick={() => setOpen(true)}
        variant="destructive"
        disabled={loading}
      >
        <Trash className="h-3 w-3" />
      </Button>
      <DeleteConfirmModal
        loading={loading}
        open={open}
        setOpen={setOpen}
        title={`ยืนยันการลบ "${name}"`}
        description="รายการนี้จะถูกลบอย่างถาวร คุณแน่ใจที่จะลบหรือไม่?"
        onDelete={handleDelete}
      />
    </>
  );
};
