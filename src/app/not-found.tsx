import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen px-10">
      {/* <StaticNavbar /> */}
      <div className="flex flex-col items-center justify-center pt-28 md:grid md:grid-flow-col md:grid-rows-3">
        <header className="md:order-2 lg:col-span-2">
          <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
            404 ไม่พบหน้านี้
          </h1>
          <h2 className="text-base md:text-lg">
            ไม่พบหน้าเว็บไซต์ที่คุณต้องการ
          </h2>
        </header>
        <div className="relative m-10 h-[200px] w-[200px] md:order-1 md:row-span-3">
          <Image
            className="rounded-3xl"
            alt="sad panda"
            src="/error/sadPanda.jpg"
            sizes="200px"
            priority
            fill
          />
        </div>
        <div className="max-w-[350px] md:order-3 md:col-span-2">
          <div className="grid grid-cols-1 gap-y-4">
            <Link href="/">
              <Button className="w-full">กลับไปยังหน้าหลัก</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "404 ไม่พบหน้านี้",
  description: "ไม่พบหน้าเว็บไซต์ที่คุณต้องการ",
  keywords: "404, ไม่พบหน้า, not found",
};
