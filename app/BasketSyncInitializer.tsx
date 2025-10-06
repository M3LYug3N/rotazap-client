"use client";

import { useBasketSync } from "@/hooks/useBasketSync";

export const BasketSyncInitializer = () => {
  useBasketSync();
  return null;
};
