import { Metadata } from "next";

import { RefundsCreateTemplate } from "@/features/office/refunds/components/RefundsCreateTemplate";

export const metadata: Metadata = {
  title: "Оформление заявки на возврат | rotazap.ru",
  description:
    "Страница возвратов в личном кабинете rotazap.ru: информация о возвращённых товарах, причинах возврата, статусах обработки и суммах компенсаций"
};

export default function RefundsCreatePage() {
  return <RefundsCreateTemplate />;
}
