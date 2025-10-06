import { FC, useEffect, useState } from "react";

import { BasketCounterProps } from "@/features/office/basket/types";

import { useBasket } from "@/hooks/useBasket";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const BasketCounter: FC<BasketCounterProps> = ({
  skuId,
  supplierId
}) => {
  const { items, addItem, removeItem, updateItemAsync, deleteItem } =
    useBasket();

  const item = items.find(
    i => i.skuId === skuId && i.supplierId === supplierId
  );

  const [inputValue, setInputValue] = useState("0");

  useEffect(() => {
    if (item?.qty != null) {
      setInputValue(item.qty.toString());
    }
  }, [item?.qty]);

  if (!item) return null;

  const { qty: count, hash, availableQty } = item;

  const handleInputChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const trimmed = digits.replace(/^0+(?!$)/, "");
    setInputValue(trimmed || "0");
  };

  const handleBlur = async () => {
    const parsed = parseInt(inputValue || "0", 10);
    const clamped = Math.min(parsed, availableQty);

    if (clamped === 0) {
      deleteItem({ skuId, supplierId, hash }); // ✅ безопасное удаление
      return;
    }

    if (clamped !== item.qty) {
      await updateItemAsync({
        skuId,
        supplierId,
        hash,
        qty: clamped,
        price: item.price
      });
    }

    setInputValue(clamped.toString());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={() => removeItem({ skuId, supplierId, hash })}
          disabled={count <= 1}
          className={`${styles.button} ${count <= 1 ? styles.buttonDisabled : styles.buttonActive}`}
        >
          –
        </button>

        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          onBlur={handleBlur}
          className={styles.input}
        />

        <button
          onClick={() => addItem({ skuId, supplierId, hash })}
          disabled={count >= availableQty}
          className={`${styles.button} ${count >= availableQty ? styles.buttonDisabled : styles.buttonActive}`}
        >
          +
        </button>
      </div>
    </div>
  );
};
