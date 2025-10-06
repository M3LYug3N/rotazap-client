import { Metadata } from "next";

import { AccountTemplate } from "@/features/office/account/components/AccountTemplate";

export const metadata: Metadata = {
  title: "Учетная запись | rotazap.ru",
  description:
    "Страница учетной записи в личном кабинете rotazap.ru: просмотр и изменение личной информации, пароля и настроек профиля"
};

export default function AccountPage() {
  return <AccountTemplate />;
}
