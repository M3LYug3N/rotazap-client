import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { BasketDiffItem } from "@/features/office/basket/types/basket-diff.type";
import { generateBasketHash } from "@/features/office/basket/utils/generate-basket-hash";

import {
  BasketItem,
  addToBasket,
  clearBasket,
  deleteFromBasket,
  fetchBasket,
  removeFromBasket,
  validateBasket
} from "@/libs/api/basket";

type BasketActionInput = Pick<BasketItem, "skuId" | "supplierId" | "hash"> & {
  brand?: string;
  article?: string;
  descr?: string;
  price?: number;
  basePrice?: number; // Обязательно для корректной работы
  qty?: number;
  deliveryDays?: number;
  selected?: boolean;
};

type UseBasketParams = {
  selectedSet?: Set<string>;
  setSelectedSet?: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export const useBasket = (params?: UseBasketParams) => {
  const selectedSet = params?.selectedSet;
  const setSelectedSet = params?.setSelectedSet;

  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery<BasketItem[]>({
    queryKey: ["basket"],
    queryFn: fetchBasket
  });

  const getKey = (skuId: number, supplierId: number, hash: string) =>
    `${skuId}_${supplierId}_${hash}`;

  const extendedItems = useMemo(
    () =>
      items.map(item => ({
        ...item,
        selected:
          selectedSet?.has(getKey(item.skuId, item.supplierId, item.hash)) ??
          false
      })),
    [items, selectedSet]
  );

  const toggleItemSelection = (
    skuId: number,
    supplierId: number,
    hash: string
  ) => {
    if (!setSelectedSet || !selectedSet || !hash) return;

    const key = getKey(skuId, supplierId, hash);
    setSelectedSet(prev => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  const selectAllItems = (checked: boolean) => {
    if (!setSelectedSet) return;

    if (checked) {
      const all = items.map(i => getKey(i.skuId, i.supplierId, i.hash));
      setSelectedSet(new Set(all));
    } else {
      setSelectedSet(new Set());
    }
  };

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["basket"] });

  const addMutation = useMutation({
    mutationFn: (item: BasketItem) => addToBasket(item),
    onSuccess: invalidate
  });

  const removeMutation = useMutation({
    mutationFn: ({ skuId, supplierId, hash }: BasketActionInput) => {
      if (!hash) throw new Error("Missing hash for removeItem");
      return removeFromBasket(skuId, supplierId, hash);
    },
    onSuccess: invalidate
  });

  const deleteMutation = useMutation({
    mutationFn: ({ skuId, supplierId, hash }: BasketActionInput) => {
      if (!hash) throw new Error("Missing hash for deleteItem");
      return deleteFromBasket(skuId, supplierId, hash);
    },
    onSuccess: (_, { skuId, supplierId, hash }) => {
      invalidate();

      if (!setSelectedSet) return;

      const key = getKey(skuId, supplierId, hash);
      setSelectedSet(prev => {
        const copy = new Set(prev);
        copy.delete(key);
        return copy;
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      skuId,
      supplierId,
      hash,
      qty,
      price,
      basePrice,
      article,
      brand,
      descr,
      deliveryDays
    }: BasketActionInput) => {
      if (
        !hash ||
        typeof qty !== "number" ||
        typeof price !== "number" ||
        typeof basePrice !== "number"
      ) {
        throw new Error("Missing required fields for updateItem");
      }

      // 1. Удалить старую позицию
      await deleteFromBasket(skuId, supplierId, hash);

      // 2. Сгенерировать новый hash
      const newHash = generateBasketHash(skuId, supplierId, basePrice, qty);

      // 3. Создать новую запись
      return addToBasket({
        skuId,
        supplierId,
        hash: newHash,
        qty,
        price,
        basePrice,
        article: article ?? "",
        brand: brand ?? "",
        descr: descr ?? "",
        deliveryDays: deliveryDays ?? 0,
        selected: true,
        availableQty: qty
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["basket"] });
    }
  });

  const deleteSelectedAsync = async () => {
    if (!selectedSet || selectedSet.size === 0) return;

    const selectedItems = items.filter(item =>
      selectedSet.has(getKey(item.skuId, item.supplierId, item.hash))
    );

    await Promise.all(
      selectedItems.map(item =>
        deleteMutation.mutateAsync({
          skuId: item.skuId,
          supplierId: item.supplierId,
          hash: item.hash
        })
      )
    );
  };

  const checkForDiff = async (): Promise<BasketDiffItem[]> => {
    console.log("📦 items перед отправкой на compare:", extendedItems);
    return await validateBasket(extendedItems);
  };

  const clearMutation = useMutation({
    mutationFn: clearBasket,
    onSuccess: () => {
      invalidate();
      if (setSelectedSet) setSelectedSet(new Set());
    }
  });

  return {
    items: extendedItems,
    isLoading,
    error,

    addItem: (input: BasketActionInput) => {
      if (!input.hash) throw new Error("Missing hash for addItem");

      const basketItem: BasketItem = {
        skuId: input.skuId,
        supplierId: input.supplierId,
        hash: input.hash,
        brand: input.brand ?? "",
        article: input.article ?? "",
        descr: input.descr ?? "",
        price: input.price ?? 0,
        basePrice: input.basePrice ?? 0,
        qty: input.qty ?? 1,
        deliveryDays: input.deliveryDays ?? 0,
        selected: input.selected ?? false,
        availableQty: input.qty ?? 0
      };

      addMutation.mutate(basketItem);
    },

    updatePrice: (skuId: number, newPrice: number) => {
      const item = items.find(i => i.skuId === skuId);
      if (!item) return;

      updateMutation.mutate({
        skuId: item.skuId,
        supplierId: item.supplierId,
        hash: item.hash,
        qty: item.qty, // отправляем текущее количество
        price: newPrice // передаём новую цену
      });
    },

    removeItem: (input: BasketActionInput) => removeMutation.mutate(input),
    deleteItem: (input: BasketActionInput) => deleteMutation.mutate(input),
    updateItem: (input: BasketActionInput) => updateMutation.mutate(input), // ✅
    clear: () => clearMutation.mutate(),

    addItemAsync: addMutation.mutateAsync,
    removeItemAsync: removeMutation.mutateAsync,
    deleteItemAsync: deleteMutation.mutateAsync,
    clearAsync: clearMutation.mutateAsync,
    updateItemAsync: updateMutation.mutateAsync, // ✅
    deleteSelectedAsync,

    toggleItemSelection,
    selectAllItems,
    checkForDiff
  };
};
