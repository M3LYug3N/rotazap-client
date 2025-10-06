"use client";

import { useState } from "react";

import { BasketEmpty } from "@/features/office/basket/components/BasketEmpty";
import { BasketSummary } from "@/features/office/basket/components/BasketSummary";
import { BasketTable } from "@/features/office/basket/components/tables/BasketTable";

import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

import { useBasket } from "@/hooks/useBasket";

export const BasketTemplate = () => {
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  const { items, isLoading } = useBasket({ selectedSet, setSelectedSet });

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="officePage">
      <div className="flex items-center justify-between gap-x-[160px]">
        <h2 className="officePageTitle">Корзина</h2>
        <div className="w-full max-w-[566px]">
          <SearchForm />
        </div>
      </div>
      <div className="officePageContent">
        {items.length > 0 ? (
          <>
            <BasketTable
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
            <BasketSummary
              selectedSet={selectedSet}
              setSelectedSet={setSelectedSet}
            />
          </>
        ) : (
          <BasketEmpty />
        )}
      </div>
    </div>
  );
};
