"use client";

import {
  HomeIcon,
  LayoutDashboard,
  LayoutListIcon,
  LucideIcon,
  MonitorCog,
} from "lucide-react";
import Link from "next/link";
import { useToggleSideNav } from "./use-toggle-sidenav";
import { SignOutButton } from "./signout-button";

const LINKS: { href: string; title: string; icon: LucideIcon }[] = [
  {
    href: "/admin",
    title: "หน้าหลัก Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/category",
    title: "จัดการหมวดหมู่",
    icon: LayoutListIcon,
  },
  { href: "/admin/attribute", title: "จัดการคุณสมบัติ", icon: MonitorCog },
  {
    href: "/",
    title: "หน้าหลักลูกค้า",
    icon: HomeIcon,
  },
];

export const NavLinks = () => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex flex-col space-y-4">
      {LINKS.map((link) => (
        <NavLink key={link.href} {...link} isExpanded={isExpanded} />
      ))}
      <SignOutButton isExpanded={isExpanded} />
    </div>
  );
};
export const NavLinksForSheet = () => {
  return (
    <div className="flex flex-col space-y-4">
      {LINKS.map((link) => (
        <NavLink key={link.href} {...link} isExpanded />
      ))}
      <SignOutButton isExpanded />
    </div>
  );
};
const NavLink = ({
  href,
  title,
  icon: Icon,
  isExpanded,
}: {
  href: string;
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
}) => {
  return (
    <Link href={href}>
      <div className="mx-4 flex w-full items-center">
        <Icon className="mr-3 h-6 w-6" />
        <span hidden={!isExpanded}>{title}</span>
      </div>
    </Link>
  );
};
