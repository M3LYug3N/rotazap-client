/* import { useEffect, useState } from "react";

import { fetchCrossesData } from "@/features/search-results/server/crossesService";
import { CrossData } from "@/features/search-results/types/crosses-data";

// Кастомный хук для загрузки данных о кроссах
export const useCrossesData = (number: string, brand: string) => {
  const [data, setData] = useState<CrossData | null>(null); // Данные о кроссах
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Устанавливаем состояние загрузки
      setError(null); // Сбрасываем ошибку перед запросом

      try {
        // Вызываем функцию fetchCrossesData
        const fetchedData = await fetchCrossesData(number, brand);

        if (fetchedData) {
          setData({
            descr: fetchedData.descr,
            properties: fetchedData.properties,
            crosses: fetchedData.crosses.map(cross => ({
              crossType: cross.crossType,
              number: cross.number,
              numberFix: cross.numberFix,
              reliable: cross.reliable
            }))
          });
        } else {
          setData({
            descr: "Описание отсутствует",
            properties: {},
            crosses: []
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Ошибка загрузки данных");
        } else {
          setError("Непредвиденная ошибка");
        }
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchData();
  }, [number, brand]);

  return { data, loading, error }; // Возвращаем состояние, данные и ошибку
};
 */
