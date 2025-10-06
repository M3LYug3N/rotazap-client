import { OrderItem } from "@/libs/api/orders";

export interface OrdersFilters {
  order_status?: string;
  date_range?: [Date | null, Date | null];
  article?: string; // ✅ Добавить это
}

export interface OrdersFilterFormProps {
  onFilter: (filters: OrdersFilters) => void;
  onReset: () => void;
}

export interface OrderDetailsItem {
  brand: string;
  descr: string;
  article: string;
  price: number;
  qty: number;
  totalPrice: number;
}

export interface OrderTableItem {
  id: string;
  orderDate: Date;
  details: OrderItem[];
  status: string;
  fullName: string;
  address: string;
  orderNumber: string;
}

export interface OrdersTableProps {
  orders: OrderTableItem[];
}

export interface OrderFilters {
  order_status?: string;
  date_range?: [Date | null, Date | null];
  article?: string;
}
