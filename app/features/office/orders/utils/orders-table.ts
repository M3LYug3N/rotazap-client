import { OrderDetailsItem } from "@/features/office/orders/types";

export const getOrderSummary = (details: OrderDetailsItem[] = []) => {
  const qty = details.reduce((acc, item) => acc + (item.qty ?? 0), 0);
  const total = details.reduce((acc, item) => acc + (item.totalPrice ?? 0), 0);

  return { qty, total };
};
