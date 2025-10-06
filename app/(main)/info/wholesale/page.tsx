import { Metadata } from "next";

import { WholesaleTemplate } from "@/features/info/components/WholesaleTemplate";

export const metadata: Metadata = {
  title: "Оптовым покупателям | rotazap.ru",
  description:
    "Информация для оптовых покупателей интернет-магазина rotazap.ru: условия сотрудничества, объёмы заказов, скидки и преимущества для бизнеса"
};

export default function WholesalePage() {
  return <WholesaleTemplate />;
}
