import axios from "axios";

export interface CreateOrderItem {
  skuId: number;
  supplierId: number;
  qty: number;
  price: number;
  basePrice: number;
  descr: string;
}

export interface OrderItem {
  orderLineId: number;
  skuId: number;
  supplierId: number;
  qty: number;
  article: string;
  brand: string;
  descr: string;
  price: number;
  totalPrice: number;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  fullName?: string;
  address?: string;
  items: OrderItemResponse[];
  orderNumber: string;
}

export interface OrderItemResponse {
  orderLineId: number;
  skuId: number;
  supplierId: number;
  qty: number;
  article: string;
  brand: string;
  descr: string;
  price: number;
  basePrice?: number;
  statuses: {
    id: number;
    status: string;
    qty: number;
    createdAt: string;
  }[];
}

// Новый интерфейс для шага таймлайна
export interface OrderTimelineStep {
  name: string;
  date: string | null;
  completed: boolean;
  current: boolean;
  isDelay: boolean;
  isTerminal: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withCredentials = { withCredentials: true };

export const createOrder = async (
  items: CreateOrderItem[]
): Promise<OrderResponse> => {
  const payload = {
    items: items.map(item => ({
      ...item,
      price: Number(item.price), // на всякий случай приведение
      qty: Number(item.qty)
    }))
  };

  const res = await axios.post(`${API_URL}/orders`, payload, withCredentials);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders`, withCredentials);
  return res.data;
};

// Новый метод для получения таймлайна
export const getOrderTimeline = async (
  orderLineId: number
): Promise<OrderTimelineStep[]> => {
  const res = await axios.get(
    `${API_URL}/order-lines-status/${orderLineId}/timeline`,
    withCredentials
  );
  return res.data;
};
