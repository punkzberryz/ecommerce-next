"use client";

import Link from "next/link";
import { LINKS } from "./links";
import { useNavbarVisibilityStore } from "./use-navbar-visibility-store";
import { motion } from "framer-motion";
export const MainNavbar = () => {
  const { visible } = useNavbarVisibilityStore();

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        y: !visible ? 0 : -10,
        opacity: !visible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="hidden space-x-8 bg-background px-8 py-4 md:flex"
    >
      {LINKS.map((link, idx) => (
        <Link key={idx} href={link.href}>
          <span className="text-sm">{link.label}</span>
        </Link>
      ))}
    </motion.nav>
  );
};
