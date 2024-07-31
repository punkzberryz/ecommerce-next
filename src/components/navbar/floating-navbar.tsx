"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavbarVisibilityStore } from "./use-navbar-visibility-store";
import Link from "next/link";
import { LINKS } from "./links";
export const FloatingNavbar = () => {
  const { visible } = useNavbarVisibilityStore();
  return (
    <motion.div
      initial={{
        opacity: 1,
        y: -100,
      }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-background px-8 py-2 shadow-md dark:border-primary/40 dark:bg-black dark:shadow-primary/40"
    >
      {LINKS.map((link, idx) => (
        <Link
          key={`link=${idx}`}
          href={link.href}
          className={cn(
            "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300",
          )}
        >
          <span className="text-sm">{link.label}</span>
        </Link>
      ))}
    </motion.div>
  );
};
