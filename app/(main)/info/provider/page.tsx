import { Metadata } from "next";

import { ProviderTemplate } from "@/features/info/components/ProviderTemplate";

export const metadata: Metadata = {
  title: "Поставщикам | rotazap.ru",
  description:
    "Информация для поставщиков интернет-магазина rotazap.ru: условия сотрудничества, требования к ассортименту и форма обратной связи"
};

export default function ProviderPage() {
  return <ProviderTemplate />;
}
