"use client";

import { AttachMoneyIcon, CurrencyYenIcon, EuroIcon } from "@/components/icons";

import { useCurrencyRates } from "@/hooks/useCurrencyRates";

import styles from "@/styles/components/ui/currency-rates/CurrencyRates.module.css";

export const CurrencyRates = () => {
  const { rates, date, error } = useCurrencyRates();

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>Ошибка загрузки курсов валют</p>
      </div>
    );
  }

  if (!rates) {
    return (
      <div className={styles.container}>
        <p className={styles.title}>Загрузка курса валют...</p>
      </div>
    );
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU")
    : null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Курс валюты ЦБ РФ{formattedDate && `: ${formattedDate}`}
      </p>
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <AttachMoneyIcon
            className={styles.icon}
            sx={{ fontSize: 18, color: "green" }}
          />
          <span>{rates.USD.toFixed(2)} ₽</span>
        </li>
        <li className={styles.item}>
          <EuroIcon
            className={styles.icon}
            sx={{ fontSize: 18, color: "blue" }}
          />
          <span>{rates.EUR.toFixed(2)} ₽</span>
        </li>
        <li className={styles.item}>
          <CurrencyYenIcon
            className={styles.icon}
            sx={{ fontSize: 18, color: "red" }}
          />
          <span>{rates.CNY.toFixed(2)} ₽</span>
        </li>
      </ul>
    </div>
  );
};
