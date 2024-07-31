import { TopNavbar } from "./top-navbar";
import { FloatingNavbar } from "./floating-navbar";
import { MainNavbar } from "./main-navbar";
import { Logo } from "../icons";

export const Navbar = () => {
  return (
    <>
      <TopNavbar />
      <div className="flex flex-col items-center">
        <Logo priority width={150} height={150} />
        <MainNavbar />
      </div>
      <FloatingNavbar />
    </>
  );
};

export * from "./client-scroll-detection-wrapper";
