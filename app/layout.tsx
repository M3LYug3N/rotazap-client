import { Metadata } from "next";
import { ReactNode } from "react";

import { ibm, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";

import ClientLayout from "./ClientLayout";
import { sharedIcons } from "@/metadata-icons";

export const metadata: Metadata = {
  title: "rotazap.ru",
  description:
    "rotazap.ru — интернет-магазин автозапчастей с быстрым поиском по артикулу, бренду, OEM и кросс-номерам. Онлайн-наличие и поддержка ABCP API.",
  applicationName: "rotazap.ru",
  generator: "Next.js",
  keywords: [
    "автозапчасти",
    "поиск деталей",
    "артикул",
    "OEM",
    "аналог",
    "запчасти онлайн",
    "rotazap",
    "ABCP API"
  ],
  authors: [{ name: "rotazap.ru", url: "https://rotazap.ru" }],
  metadataBase: new URL("https://rotazap.ru"),
  verification: {
    google: "tfpPQmMVyjKmQCpESNPXZRgwEzkrY72uxilLWbPSC_M",
    other: {
      "yandex-verification": "76be64e45a69686b"
    }
  },
  icons: sharedIcons,
  openGraph: {
    type: "website",
    url: "https://rotazap.ru",
    title: "rotazap.ru — автозапчасти",
    description: "Быстрый поиск по артикулу и бренду, актуальные цены и сроки.",
    siteName: "rotazap.ru",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "rotazap.ru — автозапчасти",
    description: "Поиск по артикулу и бренду, актуальные цены и сроки.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${roboto.variable} ${ibm.variable} antialiased`}
    >
      <body className="app">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
