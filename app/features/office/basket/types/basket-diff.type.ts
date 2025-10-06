export type BasketDiffItem = {
  skuId: number;
  supplierId: number;
  article: string;
  brand: string;
  descr: string;
  oldPrice?: number;
  newPrice?: number;
  oldQty?: number;
  newQty?: number;
};

export interface BasketDiffModalProps {
  open: boolean;
  changes: BasketDiffItem[];
  onApply: () => void;
  onClose: () => void;
}

export interface BasketDiffModalTableProps {
  changes: BasketDiffItem[];
}
