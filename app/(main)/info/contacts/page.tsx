import { Metadata } from "next";

import { ContactsTemplate } from "@/features/info/components/ContactsTemplate";

export const metadata: Metadata = {
  title: "Контакты | rotazap.ru",
  description:
    "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи"
};

export default function ContactsPage() {
  return <ContactsTemplate />;
}
