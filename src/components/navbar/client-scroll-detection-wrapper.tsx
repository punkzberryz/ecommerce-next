"use client";
import { ReactNode } from "react";
import { useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useNavbarVisibilityStore } from "./use-navbar-visibility-store";
export const ClientScrollDetectionWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { scrollY, scrollYProgress } = useScroll();
  const { setVisibility } = useNavbarVisibilityStore();
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") {
      return;
    }
    let direction = current - scrollYProgress.getPrevious()!;

    if (scrollYProgress.get() < 0.05) {
      setVisibility(false);
      return;
    }
    if (direction > 0) {
      setVisibility(true);
      return;
    }
  });
  // return <AnimatePresence mode="wait">{children}</AnimatePresence>;
  return <>{children}</>;
};
