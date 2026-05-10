import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col w-full relative">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16 md:pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
