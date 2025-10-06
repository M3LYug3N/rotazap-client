"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/buttons/Button";
import { FilterInput } from "@/components/ui/forms/inputs/filter/FilterInput";
import { FilterSelect } from "@/components/ui/forms/inputs/filter/FilterSelect";

import styles from "@/styles/pages/search/SearchFilterPanel.module.css";

export interface Item {
  brand: string;
  article: string;
  price: number;
}

export interface FormFilters {
  brand: string;
  article: string;
  minPrice: string;
  maxPrice: string;
}

const extractUniqueValues = (items: Item[]) => {
  const brands = [...new Set(items.map(i => i.brand))];
  const articles = [...new Set(items.map(i => i.article))];
  const prices = items.map(i => i.price).filter(p => !isNaN(p));

  const min = prices.length > 0 ? Math.min(...prices) : 0;
  const max = prices.length > 0 ? Math.max(...prices) : 0;

  return { brands, articles, minPrice: min, maxPrice: max };
};

export const SearchFilterPanel = ({
  items,
  onFilter
}: {
  items: Item[];
  onFilter: (filters: {
    brand: string;
    article: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}) => {
  const { brands, articles, minPrice, maxPrice } = useMemo(
    () => extractUniqueValues(items),
    [items]
  );

  const { control, setValue, reset } = useForm<FormFilters>({
    defaultValues: {
      brand: "",
      article: "",
      minPrice: String(minPrice),
      maxPrice: String(maxPrice)
    }
  });

  const values = useWatch({ control });

  useEffect(() => {
    onFilter({
      brand: values.brand || "",
      article: values.article || "",
      minPrice: parseFloat(values.minPrice || "") || 0,
      maxPrice: parseFloat(values.maxPrice || "") || 0
    });
  }, [values, onFilter]);

  useEffect(() => {
    setValue("minPrice", String(minPrice));
    setValue("maxPrice", String(maxPrice));
  }, [minPrice, maxPrice, setValue]);

  const handlePriceBlur = (field: "minPrice" | "maxPrice") => {
    const raw = values[field];
    const val = parseFloat(raw || "");

    if (isNaN(val)) {
      setValue(field, String(field === "minPrice" ? minPrice : maxPrice));
      return;
    }

    if (field === "minPrice") {
      if (val < minPrice) setValue("minPrice", String(minPrice));
      else if (val > maxPrice) setValue("minPrice", String(maxPrice));
    }

    if (field === "maxPrice") {
      if (val < minPrice) setValue("maxPrice", String(minPrice));
      else if (val > maxPrice) setValue("maxPrice", String(maxPrice));
    }
  };

  const handleReset = () => {
    reset({
      brand: "",
      article: "",
      minPrice: String(minPrice),
      maxPrice: String(maxPrice)
    });
  };

  return (
    <div className={styles.panel}>
      <FilterSelect
        control={control}
        name="article"
        options={articles}
        placeholder="Все артикулы"
      />
      <FilterSelect
        control={control}
        name="brand"
        options={brands}
        placeholder="Все бренды"
      />
      <div className="w-full max-w-[100px]">
        <FilterInput
          control={control}
          name="minPrice"
          label="Цена от"
          type="number"
          placeholder={String(minPrice)}
          step={1}
          inputMode="decimal"
          onBlur={() => handlePriceBlur("minPrice")}
        />
      </div>

      <div className="w-full max-w-[100px]">
        <FilterInput
          control={control}
          name="maxPrice"
          label="Цена до"
          type="number"
          placeholder={String(maxPrice)}
          step={1}
          inputMode="decimal"
          onBlur={() => handlePriceBlur("maxPrice")}
        />
      </div>
      <div className="mt-[4px]">
        <Button size="Medium" variant="SecondaryOutline" onClick={handleReset}>
          Сброс
        </Button>
      </div>
    </div>
  );
};
