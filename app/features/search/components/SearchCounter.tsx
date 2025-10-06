import { useEffect, useState } from "react";

import { SearchCounterProps } from "@/features/search/types";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const SearchCounter = ({
  count,
  stock,
  price,
  onIncrement,
  onDecrement,
  onInputChange
}: SearchCounterProps) => {
  const [inputValue, setInputValue] = useState(count.toString());

  useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  const totalPrice = formatNumber(price * count);

  const handleInputChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const trimmed = digits.replace(/^0+(?!$)/, "");
    setInputValue(trimmed || "0");
  };

  const handleBlur = () => {
    const parsed = parseInt(inputValue || "0", 10);
    const clamped = Math.min(parsed, stock);

    if (clamped === 0) {
      onInputChange?.(0);
      return;
    }

    if (clamped !== count) {
      onInputChange?.(clamped);
    }

    setInputValue(clamped.toString());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={onDecrement}
          disabled={count === 0}
          className={`${styles.button} ${count === 0 ? styles.buttonDisabled : styles.buttonActive}`}
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
          onClick={onIncrement}
          disabled={count >= stock}
          className={`${styles.button} ${count >= stock ? styles.buttonDisabled : styles.buttonActive}`}
        >
          +
        </button>
      </div>
      <span className="text-sm">{totalPrice}</span>
    </div>
  );
};
