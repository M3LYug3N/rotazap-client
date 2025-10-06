import { Metadata } from "next";

import { CrossesTemplate } from "@/features/search/components/CrossesTemplate";

export const metadata: Metadata = {
  title: "Результаты поиска | rotazap.ru",
  description:
    "Второй этап поиска на rotazap.ru — отображение найденных брендов и артикулов по введённому номеру. Поддержка OEM, кросс-номеров и аналогов"
};

export default function SearchCrossesPage() {
  return <CrossesTemplate />;
}
