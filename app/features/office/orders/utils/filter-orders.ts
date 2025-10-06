import { OrderFilters, OrderTableItem } from "@/features/office/orders/types";

import { endOfDay, isWithinInterval } from "date-fns";

/** Применяет фильтры к списку заказов */
export const filterOrders = (
  orders: OrderTableItem[],
  filters: OrderFilters
): OrderTableItem[] => {
  const { order_status, date_range, article } = filters;
  return orders.filter(order => {
    const matchStatus = order_status ? order.status === order_status : true;

    const matchDate =
      Array.isArray(date_range) && date_range[0] && date_range[1]
        ? isWithinInterval(new Date(order.orderDate), {
            start: date_range[0],
            end: endOfDay(date_range[1])
          })
        : true;
    const matchArticle = article
      ? order.details.some(detail =>
          detail.article.toLowerCase().includes(article.toLowerCase())
        )
      : true;

    return matchStatus && matchDate && matchArticle;
  });
};
