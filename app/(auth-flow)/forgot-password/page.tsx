import { Metadata } from "next";

import { ForgotPasswordTemplate } from "@/features/password/components/ForgotPasswordTemplate";

export const metadata: Metadata = {
  title: "Восстановление пароля | rotazap.ru",
  description:
    "Страница восстановления пароля на rotazap.ru. Предназначена для запроса ссылки на сброс пароля через адрес электронной почты",
  openGraph: {
    title: "Восстановление пароля | rotazap.ru",
    description:
      "Страница восстановления пароля на rotazap.ru. Предназначена для запроса ссылки на сброс пароля через адрес электронной почты",
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Восстановление пароля | rotazap.ru",
    description:
      "Страница восстановления пароля на rotazap.ru. Предназначена для запроса ссылки на сброс пароля через адрес электронной почты",
    images: ["/opengraph-image?v=2"]
  }
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordTemplate />;
}
