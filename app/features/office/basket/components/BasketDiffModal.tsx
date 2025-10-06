"use client";

import { BasketDiffModalTable } from "@/features/office/basket/components/tables/BasketDiffModalTable";
import { BasketDiffModalProps } from "@/features/office/basket/types/basket-diff.type";

import { Button } from "@/components/ui/buttons/Button";
import { ModalComponent } from "@/components/ui/modal/ModalComponent";

import styles from "@/styles/pages/office/basket/BasketDiffModal.module.css";

export const BasketDiffModal = ({
  open,
  changes,
  onApply,
  onClose
}: BasketDiffModalProps) => (
  <ModalComponent open={open} onClose={onClose}>
    <div className={styles.modalWrapper}>
      <h2 className={styles.title}>Изменения в корзине</h2>
      <p className={styles.description}>
        Для оформления заказа необходимо пересчитать корзину
      </p>
      <BasketDiffModalTable changes={changes} />
      <Button size="Small" onClick={onApply}>
        Пересчитать корзину
      </Button>
    </div>
  </ModalComponent>
);
