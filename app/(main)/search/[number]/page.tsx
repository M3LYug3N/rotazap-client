import { Metadata } from "next";

import { ResultTemplate } from "@/features/search/components/ResultTemplate";

export const metadata: Metadata = {
  title: "Результаты поиска | rotazap.ru",
  description:
    "Первый этап поиска на rotazap.ru — отображение найденных брендов и артикулов по введённому номеру. Поддержка OEM, кросс-номеров и аналогов"
};

export default function SearchResultsPage() {
  return <ResultTemplate />;
}
