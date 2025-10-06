"use client";

import { ConstitutionalDocsUpload } from "@/features/office/documents/components/ConstitutionalDocsUpload";

import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

export const DocumentsTemplate = () => (
  <div className="officePage">
    <div className="flex items-center justify-between gap-x-[160px]">
      <h2 className="officePageTitle">Уставные документы</h2>
      <div className="w-full max-w-[566px]">
        <SearchForm />
      </div>
    </div>
    <div className="officePageContent">
      <ConstitutionalDocsUpload />
    </div>
  </div>
);
