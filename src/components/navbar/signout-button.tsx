import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { LoadingBars } from "../ui/loading-bars";
import { useAuthStore } from "@/hooks/use-auth-store";

export const SignOutButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const handleOnClick = async () => {
    setLoading(true);
    const resp = await fetch("/auth/signout", {
      method: "GET",
      cache: "no-store",
    });
    setLoading(false);
    if (!resp.ok) {
      console.error({
        status: resp.status,
        text: resp.statusText,
        data: await resp.json(),
      });
      toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
      return;
    }
    toast.success("ออกจากระบบสำเร็จ");
    router.push("/auth/signin");
    router.refresh();
    setUser(null);
    setOpen(false);
    return;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center space-x-2">
        <LogOut className="h-4 w-4" />
        <span>ออกจากระบบ</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ออกจากระบบ</DialogTitle>
          <DialogDescription>คุณต้องการออกจากระบบใช่หรือไม่?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4 md:flex-row-reverse">
          <Button disabled={loading} onClick={handleOnClick}>
            {loading ? (
              <LoadingBars className="h-6 w-6" />
            ) : (
              <span>ออกจากระบบ</span>
            )}
          </Button>
          <Button
            disabled={loading}
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            ยกเลิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
