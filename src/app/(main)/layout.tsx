import { Footer } from "@/components/footer";
import { ClientScrollDetectionWrapper, Navbar } from "@/components/navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <ClientScrollDetectionWrapper>
        <main className="flex min-h-[calc(100vh-56px)] flex-col items-center pt-2">
          {children}
        </main>
        <Footer />
      </ClientScrollDetectionWrapper>
    </>
  );
};

export default MainLayout;
