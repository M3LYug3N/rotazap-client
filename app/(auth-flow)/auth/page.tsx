import { Metadata } from "next";

import { ProtectedAuthPage } from "@/(auth-flow)/auth/protected-page";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
  openGraph: {
    title: "Вход и регистрация | rotazap.ru",
    description:
      "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
    url: "https://rotazap.ru/auth",
    siteName: "rotazap.ru",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "/opengraph-image?v=2",
        width: 1200,
        height: 630,
        alt: "rotazap.ru – интернет-магазин автозапчастей",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Вход и регистрация | rotazap.ru",
    description:
      "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
    images: ["/opengraph-image?v=2"]
  }
};

export default function AuthPage() {
  return <ProtectedAuthPage />;
}
