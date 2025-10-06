import { Metadata } from "next";

import { AboutCompanyTemplate } from "@/features/info/components/AboutCompanyTemplate";

export const metadata: Metadata = {
  title: "О компании | rotazap.ru",
  description:
    "Страница с информацией о компании rotazap.ru — интернет-магазине автозапчастей для иномарок. Общие сведения и принципы работы"
};

export default function AboutCompanyPage() {
  return <AboutCompanyTemplate />;
}
