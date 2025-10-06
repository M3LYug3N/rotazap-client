import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

import { OrderTableItem } from "@/features/office/orders/types";

import type { CreateOrderItem, OrderItemResponse } from "@/libs/api/orders";
import { OrderResponse, createOrder, getOrders } from "@/libs/api/orders";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const lastStatusesRef = useRef<Record<string, string>>({});

  const create = useMutation<OrderResponse, Error, CreateOrderItem[]>({
    mutationFn: (items: CreateOrderItem[]) => createOrder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });

  const query = useQuery<OrderTableItem[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const rawOrders: OrderResponse[] = await getOrders();

      return rawOrders.map(
        (order): OrderTableItem => ({
          id: String(order.id),
          orderNumber: order.orderNumber,
          orderDate: new Date(order.createdAt),
          details: order.items.map((item: OrderItemResponse) => ({
            orderLineId: item.orderLineId,
            skuId: item.skuId,
            supplierId: item.supplierId,
            qty: item.qty,
            article: item.article,
            brand: item.brand,
            descr: item.descr,
            price: item.price,
            totalPrice: item.price * item.qty,
            statuses: item.statuses
          })),
          status: order.items?.[0]?.statuses?.[0]?.status ?? "-",
          fullName: order.fullName ?? "-",
          address: order.address ?? "-"
        })
      );
    },
    refetchInterval: 15000
  });
  // сравниваем статусы и шлем toast при изменении
  useEffect(() => {
    const orders = query.data; // тип: OrderTableItem[] | undefined
    if (!orders) return;

    orders.forEach(o => {
      const prev = lastStatusesRef.current[o.id];
      if (prev && prev !== o.status) {
        toast.success(
          `Статус заказа ${o.orderNumber} изменился: ${prev} → ${o.status}`
        );
      }
      lastStatusesRef.current[o.id] = o.status;
    });
  }, [query.data]);

  return {
    ...query,
    createOrder: create.mutate,
    createOrderAsync: create.mutateAsync
  };
};
