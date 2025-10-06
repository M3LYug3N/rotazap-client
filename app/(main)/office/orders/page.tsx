import { Metadata } from "next";

import { OrdersTemplate } from "@/features/office/orders/components/OrdersTemplate";

export const metadata: Metadata = {
  title: "Заказы | rotazap.ru",
  description:
    "История заказов в личном кабинете rotazap.ru: список оформленных заказов, статусы, состав, суммы и даты оформления"
};

export default function OrdersPage() {
  return <OrdersTemplate />;
}
