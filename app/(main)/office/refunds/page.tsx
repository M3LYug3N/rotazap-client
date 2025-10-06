import { Metadata } from "next";

import { RefundsTemplate } from "@/features/office/refunds/components/RefundsTemplate";

export const metadata: Metadata = {
  title: "Возвраты | rotazap.ru",
  description:
    "Страница возвратов в личном кабинете rotazap.ru: информация о возвращённых товарах, причинах возврата, статусах обработки и суммах компенсаций"
};

export default function RefundsPage() {
  return <RefundsTemplate />;
}
