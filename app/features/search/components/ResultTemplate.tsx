"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import TemplateWrapper from "@/features/search/components/TemplateWrapper";
import { ResultTable } from "@/features/search/components/tables/result/ResultTable";
import { fetchBrands } from "@/features/search/server/fetchBrands";
import { SearchBrand } from "@/features/search/types";

import styles from "@/styles/pages/search/Search.module.css";

/**
 * Компонент для отображения результатов первого этапа поиска запчастей.
 */
export const ResultTemplate = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const [brands, setBrands] = useState<SearchBrand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const number = useMemo(() => {
    const raw = (params?.number as string) || searchParams.get("number");

    return typeof raw === "string" && !raw.includes("function") ? raw : null;
  }, [params, searchParams]);

  useEffect(() => {
    if (!number) {
      setError("Неверный формат номера детали");
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await fetchBrands(number);
        setBrands(data);
        setError(null);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Ошибка при выполнении запроса к ABCP API"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [number]);

  const renderContent = (() => {
    if (!number || loading) {
      return <h2 className={styles.title}>Загрузка...</h2>;
    }

    if (error) {
      return <h2 className={styles.titleError}>{error}</h2>;
    }

    if (brands.length === 0) {
      return (
        <h2 className={styles.title}>Запрошенный артикул детали не найден</h2>
      );
    }

    return (
      <>
        <h2 className={styles.title}>
          Результаты поиска для артикула <span>{number}</span>
        </h2>
        <ResultTable
          brands={brands}
          fallbackNumber={number || "Неизвестный артикул"}
        />
      </>
    );
  })();

  return <TemplateWrapper>{renderContent}</TemplateWrapper>;
};
