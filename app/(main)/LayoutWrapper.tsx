"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <>
      <main className={isHome ? "justify-center" : ""}>{children}</main>
    </>
  );
};
