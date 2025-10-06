"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { BasketDiffModal } from "@/features/office/basket/components/BasketDiffModal";
import { BasketDiffItem } from "@/features/office/basket/types/basket-diff.type";

import { Button } from "@/components/ui/buttons/Button";

import { useBasket } from "@/hooks/useBasket";
import { useOrders } from "@/hooks/useOrders";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/basket/Basket.module.css";

interface BasketSummaryProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketSummary = ({
  selectedSet,
  setSelectedSet
}: BasketSummaryProps) => {
  const router = useRouter();
  const {
    items,
    deleteSelectedAsync,
    updateItemAsync,
    deleteItemAsync,
    checkForDiff // 👈 добавлено из useBasket
  } = useBasket({ selectedSet, setSelectedSet });

  const { createOrderAsync } = useOrders();

  const [showDiffModal, setShowDiffModal] = useState(false);
  const [diffs, setDiffs] = useState<BasketDiffItem[]>([]);
  const [lockedCheckout, setLockedCheckout] = useState(false);

  const selectedItems = useMemo(
    () => items.filter(item => item.selected),
    [items]
  );

  const selectedCount = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.qty, 0),
    [selectedItems]
  );

  const selectedPrice = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [selectedItems]
  );

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [items]
  );

  const handleCheckout = async () => {
    if (lockedCheckout) {
      setShowDiffModal(true);
      return;
    }

    try {
      const diffs = await checkForDiff();

      if (diffs.length > 0) {
        setDiffs(diffs);
        setShowDiffModal(true);
        setLockedCheckout(true);
        toast.warn("Цены или остатки некоторых товаров изменились");
        return;
      }

      const payload = selectedItems.map(item => ({
        skuId: item.skuId,
        supplierId: item.supplierId,
        qty: item.qty,
        price: item.price,
        basePrice: item.basePrice,
        descr: item.descr
      }));

      await createOrderAsync(payload);
      toast.success("Заказ успешно оформлен!");
      await deleteSelectedAsync();
      router.push("/office/orders");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Ошибка при оформлении заказа"
      );
    }
  };

  const handleApplyChanges = async () => {
    const updates = diffs.map(async diff => {
      const item = items.find(
        i => i.skuId === diff.skuId && i.supplierId === diff.supplierId
      );

      if (!item) return;

      if (diff.newQty === 0) {
        return deleteItemAsync({
          skuId: diff.skuId,
          supplierId: diff.supplierId,
          hash: item.hash
        });
      }

      return updateItemAsync({
        skuId: diff.skuId,
        supplierId: diff.supplierId,
        hash: item.hash,
        qty: diff.newQty,
        price: diff.newPrice,
        basePrice: item.basePrice,
        article: item.article,
        brand: item.brand,
        descr: item.descr,
        deliveryDays: item.deliveryDays
      });
    });

    await Promise.all(updates);

    setShowDiffModal(false);
    setLockedCheckout(false);
    toast.info("Корзина обновлена. Повторите оформление заказа.");
  };

  return (
    <>
      <div className={styles.summaryContainer}>
        <div className={styles.summaryWrapper}>
          <div className={styles.summaryInfo}>
            <div className={styles.summaryTitle}>Итого в корзине:</div>
            <div className={styles.summaryInfoItem}>
              <p>Количество товаров:</p> <span>{totalCount} шт.</span>
            </div>
            <div className={styles.summaryInfoItem}>
              <p>Общая стоимость:</p>
              <span>{formatNumber(totalPrice)} ₽</span>
            </div>
          </div>

          <div className={`${styles.summaryInfo} ${styles.summaryInfoOrder}`}>
            <div
              className={`${styles.summaryTitle} ${styles.summaryTitleOrder}`}
            >
              Итого в заказе:
            </div>
            <div className={styles.summaryInfoItem}>
              <p>Количество товаров:</p> <span>{selectedCount} шт.</span>
            </div>
            <div className={styles.summaryInfoItem}>
              <p>Общая стоимость:</p>
              <span>{formatNumber(selectedPrice)} ₽</span>
            </div>
          </div>
        </div>

        <div className={styles.summaryButtonWrapper}>
          <Button
            isDisabled={selectedItems.length === 0}
            onClick={handleCheckout}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      <BasketDiffModal
        open={showDiffModal}
        changes={diffs}
        onApply={handleApplyChanges}
        onClose={() => setShowDiffModal(false)}
      />
    </>
  );
};
