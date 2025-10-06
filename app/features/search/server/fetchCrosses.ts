import {
  AbcpResponse,
  CrossData,
  CrossImage,
  LocalOfferGroupList
} from "@/features/search/types";

import axiosInstance from "@/libs/axios";

export const fetchCrossesData = async (
  number: string,
  brand: string,
  userId: number
): Promise<CrossData | null> => {
  if (!userId) {
    console.warn("User ID не найден, запрос не будет выполнен");
    return null;
  }

  try {
    const response = await axiosInstance.get<AbcpResponse>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/article-info`,
      {
        params: {
          number,
          brand,
          userId,
          format: "bnpchmti",
          locale: "ru_RU"
        }
      }
    );

    const data = response.data;

    if (!data || Object.keys(data).length === 0) {
      console.warn("Пустой ответ от API или ошибка в данных");
      return null;
    }

    const localOffers: LocalOfferGroupList[] = data.localOffers || [];

    // 💬 Отладка и фильтрация изображений
    const rawImages =
      Array.isArray(data.images) && typeof data.images[0] === "string"
        ? (data.images as unknown as string[])
        : [];
    console.log("📦 [ABCP] Raw images:", rawImages);

    const mappedImages: CrossImage[] = rawImages
      .filter((img: string, i) => {
        const valid = typeof img === "string" && img.trim().length > 0;
        if (!valid) {
          console.warn(`⚠️ [ABCP] Невалидное изображение [${i}]:`, img);
        }
        return valid;
      })
      .map(img => {
        const name = img.split("/").pop() ?? "unnamed";
        const url = img;
        console.log(`✅ [ABCP] Картинка: ${name} → ${url}`);
        return { name, order: 0, url };
      });

    const mapped: CrossData = {
      brand: data.brand || "Неизвестный бренд",
      number: data.number || number,
      outerNumber: data.outer_number || number,
      descr: data.descr || "Описание отсутствует",
      properties: data.properties || {},
      localOffers, // ✅ напрямую, без map
      images: mappedImages,
      imagesCount: data.images_count || 0
    };

    return mapped;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Ошибка при получении данных о кроссах:", error.message);
      throw new Error("Ошибка загрузки данных");
    } else {
      console.error("Непредвиденная ошибка:", error);
      throw new Error("Произошла непредвиденная ошибка");
    }
  }
};
