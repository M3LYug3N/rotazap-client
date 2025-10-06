import { Metadata } from "next";

import { ResetPasswordTemplate } from "@/features/password/components/ResetPasswordTemplate";

export const metadata: Metadata = {
  title: "Сброс пароля | rotazap.ru",
  description:
    "Страница сброса пароля на rotazap.ru. Предназначена для установки нового пароля пользователями, запросившими восстановление доступа",
  openGraph: {
    title: "Сброс пароля | rotazap.ru",
    description:
      "Страница сброса пароля на rotazap.ru. Предназначена для установки нового пароля пользователями, запросившими восстановление доступа",
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Сброс пароля | rotazap.ru",
    description:
      "Страница сброса пароля на rotazap.ru. Предназначена для установки нового пароля пользователями, запросившими восстановление доступа",
    images: ["/opengraph-image?v=2"]
  }
};

export default function ResetPasswordPage() {
  return <ResetPasswordTemplate />;
}
