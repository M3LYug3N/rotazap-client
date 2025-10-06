import { Metadata } from "next";

import { ProtectedMainPage } from "@/(main)/protected-page";

export const metadata: Metadata = {
  title: "Поиск автозапчастей | rotazap.ru",
  description:
    "Быстрый поиск автозапчастей по артикулу на rotazap.ru. Уточнение по брендам, кроссам и оригинальным номерам. Поддержка OEM и ABCP API."
};

export default function MainPage() {
  return <ProtectedMainPage />;
}
