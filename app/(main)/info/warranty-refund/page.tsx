import { Metadata } from "next";

import { WarrantyRefundTemplate } from "@/features/info/components/WarrantyRefundTemplate";

export const metadata: Metadata = {
  title: "Гарантия и возвраты | rotazap.ru",
  description:
    "Правила гарантии и возврата товаров в интернет-магазине rotazap.ru: сроки, порядок оформления, условия обмена и возврата автозапчастей"
};

export default function WarrantyRefundPage() {
  return <WarrantyRefundTemplate />;
}
