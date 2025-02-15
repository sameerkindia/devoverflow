import Navar from "@/components/shared/navBar/Navar";
import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
