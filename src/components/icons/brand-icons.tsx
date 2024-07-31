import { cn } from "@/lib/utils";
import { IconProps } from ".";
import Image from "next/image";

export const GithubIcon = ({ className, priority }: IconProps) => {
  return (
    <div className={cn("rounded-full bg-white p-0.5", className)}>
      <div className="relative h-5 w-5">
        <Image
          src="/icons/brands/github.svg"
          alt="github-icon"
          fill
          priority={priority}
        />
      </div>
    </div>
  );
};
export const GoogleIcon = ({ className, priority }: IconProps) => {
  return (
    <div className={cn("rounded-full bg-white p-0.5", className)}>
      <div className="relative h-5 w-5">
        <Image
          src="/icons/brands/google.svg"
          alt="google-icon"
          fill
          priority={priority}
        />
      </div>
    </div>
  );
};
export const LineIcon = ({ className, priority }: IconProps) => {
  return (
    <div className={cn("rounded-full bg-white p-0.5", className)}>
      <div className="relative h-5 w-5">
        <Image
          src="/icons/brands/line.svg"
          alt="line-icon"
          fill
          priority={priority}
        />
      </div>
    </div>
  );
};
