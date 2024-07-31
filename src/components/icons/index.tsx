import { cn } from "@/lib/utils";
import Image from "next/image";
export interface IconProps {
  className?: string;
  priority?: boolean;
}
export const Logo = ({
  className,
  height,
  width,
  priority,
}: {
  className?: string;
  height?: number;
  width?: number;
  priority?: boolean;
}) => {
  return (
    <div className={cn("rounded-full bg-background", className)}>
      <Image
        src="/img/logo.webp"
        alt="Logo"
        height={height || 25}
        width={width || 25}
        priority={priority}
      />
    </div>
  );
};
export * from "./brand-icons";
