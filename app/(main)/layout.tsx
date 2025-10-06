import { Metadata } from "next";
import { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";

import "@/styles/globals.css";

import { LayoutWrapper } from "./LayoutWrapper";
import { sharedIcons } from "@/metadata-icons";

export const metadata: Metadata = {
  icons: sharedIcons
};

export default async function MainLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <LayoutWrapper>{children}</LayoutWrapper>
      <Footer />
    </>
  );
}
