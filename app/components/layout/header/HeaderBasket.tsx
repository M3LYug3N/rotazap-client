"use client";

import Link from "next/link";

import { ShoppingCartIcon } from "@/components/icons";

import { useBasket } from "@/hooks/useBasket";

import { pluralize } from "@/utils/pluralize";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderBasket = () => {
  const { items, isLoading } = useBasket();

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <Link href="/office/basket">
      <div className={styles.basketMenu}>
        <div className={styles.basketMenuIconWrapper}>
          <ShoppingCartIcon fontSize="large" />
        </div>
        <div className="flex flex-col">
          {isLoading ? (
            <p className={styles.basketMenuText}>Загрузка...</p>
          ) : totalCount > 0 ? (
            <>
              <p className={styles.basketMenuTitle}>В корзине</p>
              <span className={styles.basketMenuText}>
                {totalCount}{" "}
                {pluralize(totalCount, ["товар", "товара", "товаров"])}:{" "}
                {totalPrice.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB"
                })}
              </span>
            </>
          ) : (
            <p className={styles.basketMenuText}>Корзина пуста</p>
          )}
        </div>
      </div>
    </Link>
  );
};
