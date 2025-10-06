"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import TemplateWrapper from "@/features/search/components/TemplateWrapper";
import { CrossesTable } from "@/features/search/components/tables/crosses/CrossesTable";
import { fetchCrossesData } from "@/features/search/server/fetchCrosses";
import { CrossData } from "@/features/search/types";

import { useAuthStore } from "@/store/useAuthStore";

import { getProposalWord } from "@/utils/get-proposal-word";

import styles from "@/styles/pages/search/Search.module.css";

export const CrossesTemplate = () => {
  const params = useParams();
  const number = params.number as string;
  const brand = params.brand as string;
  const userId = useAuthStore(state => state.user?.id);

  const [data, setData] = useState<CrossData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isReady = data !== null;

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        if (!userId) {
          setError("Пользователь не авторизован");
          return;
        }

        const response = await fetchCrossesData(number, brand, userId);
        if (!response) throw new Error("Ничего не найдено");

        console.log("📦 Fetched Crosses Data:", response);

        if (isActive) setData(response);
      } catch (err: unknown) {
        if (isActive) {
          setError(
            err instanceof Error ? err.message : "Непредвиденная ошибка"
          );
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [number, brand, userId]);

  const renderContent = (() => {
    if (error) {
      return <h2 className={styles.titleError}>Ошибка: {error}</h2>;
    }

    if (!isReady || !Array.isArray(data?.localOffers)) {
      return <h2 className={styles.title}>Загрузка предложений...</h2>;
    }

    console.log("🧪 localOffers:", data.localOffers);

    let proposalsCount = 0;

    try {
      proposalsCount = data.localOffers.reduce(
        (sum, group) =>
          sum +
          (group.items ?? []).reduce(
            (acc, item) => acc + (item.offers?.length ?? 0),
            0
          ),
        0
      );
    } catch (err) {
      console.error("🔥 Ошибка при подсчёте предложений:", err);
      proposalsCount = 0;
    }

    console.log("🔢 proposalsCount:", proposalsCount);

    const proposalWord = getProposalWord(proposalsCount);

    if (proposalsCount === 0) {
      return <h2 className={styles.title}>Ничего не найдено</h2>;
    }

    return (
      <>
        <h2 className={styles.title}>
          Найдено {proposalsCount} {proposalWord} по артикулу{" "}
          <span>
            {number} ({brand})
          </span>
        </h2>

        <CrossesTable
          brand={brand}
          descr={data.descr || "Описание отсутствует"}
          number={number}
          outerNumber={data.outerNumber || number}
          crosses={data.localOffers}
          properties={data.properties}
          images={data.images}
        />
      </>
    );
  })();

  return <TemplateWrapper>{renderContent}</TemplateWrapper>;
};
