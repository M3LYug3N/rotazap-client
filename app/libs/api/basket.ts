import { BasketDiffItem } from "@/features/office/basket/types/basket-diff.type";

import axios from "axios";

export interface BasketItem {
  selected: boolean;
  skuId: number;
  supplierId: number;
  hash: string;
  brand: string;
  article: string;
  descr: string;
  price: number; // клиентская цена
  basePrice: number; // закупочная
  qty: number;
  availableQty: number;
  deliveryDays?: number;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withCredentials = { withCredentials: true };

// 🔔 Триггер обновления во всех вкладках
const notifyBasketUpdate = () => {
  const channel = new BroadcastChannel("basket-sync");
  channel.postMessage("update");
  channel.close();
};

// 🛒 Получение корзины
export const fetchBasket = async (): Promise<BasketItem[]> => {
  const res = await axios.get(`${API_URL}/basket`, withCredentials);

  return res.data.map((item: any) => ({
    skuId: item.skuId,
    supplierId: item.supplierId,
    hash: item.hash,
    brand: item.brand,
    article: item.article,
    descr: item.descr,
    price: item.price,
    basePrice: item.basePrice,
    qty: item.qty,
    deliveryDays: item.deliveryDays ?? 0,
    availableQty: item.availableQty ?? 0,
    selected: item.selected ?? false
  }));
};

// ➕ Добавление позиции
export const addToBasket = async (item: BasketItem) => {
  const payload = {
    skuId: item.skuId,
    supplierId: item.supplierId,
    qty: item.qty,
    price: item.price,
    basePrice: item.basePrice,
    descr: item.descr,
    article: item.article,
    brand: item.brand,
    hash: item.hash,
    deliveryDays: item.deliveryDays
  };

  await axios.post(`${API_URL}/basket/add`, payload, withCredentials);
  notifyBasketUpdate();
};

// ➖ Уменьшить кол-во (или убрать 1 шт.)
export const removeFromBasket = async (
  skuId: number,
  supplierId: number,
  hash: string
) => {
  await axios.post(
    `${API_URL}/basket/remove`,
    { skuId, supplierId, hash },
    withCredentials
  );
  notifyBasketUpdate();
};

// ❌ Полное удаление позиции
export const deleteFromBasket = async (
  skuId: number,
  supplierId: number,
  hash: string
) => {
  await axios.post(
    `${API_URL}/basket/delete`,
    { skuId, supplierId, hash },
    withCredentials
  );
  notifyBasketUpdate();
};

// 🧹 Очистка корзины
export const clearBasket = async () => {
  await axios.delete(`${API_URL}/basket/clear`, withCredentials);
  notifyBasketUpdate();
};

// ✅ Сравнение корзины с сервером
export const validateBasket = async (
  items: BasketItem[]
): Promise<BasketDiffItem[]> => {
  const res = await fetch(`${API_URL}/basket/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(
      items.map(item => ({
        skuId: item.skuId,
        supplierId: item.supplierId,
        qty: item.qty,
        price: item.price,
        article: item.article,
        brand: item.brand,
        descr: item.descr,
        hash: item.hash,
        deliveryDays: item.deliveryDays
      }))
    )
  });

  if (!res.ok) {
    throw new Error("Ошибка сравнения корзины");
  }

  return await res.json();
};
