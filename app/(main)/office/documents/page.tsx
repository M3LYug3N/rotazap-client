import { Metadata } from "next";

import { DocumentsTemplate } from "@/features/office/documents/components/DocumentsTemplate";

export const metadata: Metadata = {
  title: "Уставные документы | rotazap.ru",
  description:
    "Загрузка и управление уставными документами в личном кабинете rotazap.ru: предоставление необходимых файлов для подтверждения данных компании"
};

export default function DocumentsPage() {
  return <DocumentsTemplate />;
}
