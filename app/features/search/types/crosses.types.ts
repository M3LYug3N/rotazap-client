/* Представляет одну позицию (товар) из кросс-номеров */
export interface CrossItem {
  skuId: number;
  supplierId: number;
  brand: string;
  article: string;
  numberFix: string;
  price: number;
  basePrice: number;
  stock: number;
  count: number;
  hash: string;
  deliveryDays?: number;
}
/* Общие обработчики и дополнительные данные для таблицы и строки */
export interface CrossCommonHandlers {
  descr?: string;
  properties?: Record<string, string>;
  images?: { url: string }[];
  onUpdateCount: (index: number, value: number) => void;
  onOpenImageModal: (url: string) => void;
  onOpenInfoModal: (info: Record<string, string>) => void;
  onAddToCart: (index: number) => void;
}

/* Пропсы для тела таблицы кроссов (все строки) */
export interface CrossesTableBodyProps extends CrossCommonHandlers {
  crosses: CrossRowType[];
}

/* Пропсы для одной строки таблицы */
export interface CrossesTableRowProps extends CrossCommonHandlers {
  index: number;
  cross: CrossItem;
}

export type CrossRowType =
  | { type: "group"; label: string }
  | (CrossItem & { type?: "item" })
  | { type: "empty"; message: string };
