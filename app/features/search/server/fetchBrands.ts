import { SearchBrand } from "@/features/search/types";

import axiosInstance from "@/libs/axios";

export const fetchBrands = async (number: string): Promise<SearchBrand[]> => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/search-brands`,
    {
      params: { number }
    }
  );

  const responseData = response.data;

  if (responseData && typeof responseData === "object") {
    console.log("[fetchBrands] response data:", response.data);
    return Object.keys(responseData).map(key => ({
      id: key,
      brand: responseData[key].brand,
      number: responseData[key].number,
      numberFix: responseData[key].numberFix,
      description: responseData[key].description || "Описание отсутствует",
      availability: responseData[key].availability || 0
    }));
  }

  throw new Error("Некорректный формат ответа от сервера");
};
