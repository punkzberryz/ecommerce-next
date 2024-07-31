export const LINKS: LinkProps[] = [
  {
    href: "/",
    label: "หน้าแรก",
  },
  { href: "/promotion", label: "โปรโมชั่น" },
  { href: "/product", label: "สินค้าทั้งหมด" },
  { href: "/courses", label: "คอร์สเรียนเบเกอรี่" },
  { href: "/blog", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
];
export type LinkProps = {
  href: string;
  label: string;
};
