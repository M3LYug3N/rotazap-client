import { Metadata } from "next";

import { NotFoundTemplate } from "@/features/not-found/components/NotFoundTemplate";

export const metadata: Metadata = {
  title: "Страница не найдена",
  description:
    "Страница не найдена. Возможно эта страница была удалена или перенесена."
};

export default function NotFoundPage() {
  return <NotFoundTemplate />;
}
