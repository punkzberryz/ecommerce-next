"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useToggleSideNav } from "./use-toggle-sidenav";
import { Footer } from "../footer";
import { SideNavbar } from "./side-nav";

export const ClientSideNavWrapper = ({ children }: { children: ReactNode }) => {
  const { isExpanded } = useToggleSideNav();
  return (
    <>
      <SideNavbar
        className={cn(
          "fixed left-0 top-0 z-20 -translate-x-full transition-all duration-300 ease-in md:translate-x-0",
          isExpanded ? "w-52" : "w-16",
        )}
      />
      <main
        className={cn(
          "min-h-[calc(100vh-56px)] transition-[margin-left] duration-300 ease-in",
          isExpanded ? "md:ml-52" : "md:ml-16",
        )}
      >
        {children}
      </main>
      <Footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in",
          isExpanded ? "md:ml-52" : "md:ml-16",
        )}
      />
    </>
  );
};
