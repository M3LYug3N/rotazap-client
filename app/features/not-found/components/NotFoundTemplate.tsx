"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/buttons/Button";

import styles from "@/styles/pages/not-found/NotFound.module.css";

export const NotFoundTemplate = () => {
  const pathname = usePathname();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          window.location.href = "/";
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>ОШИБКА 404</h1>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>
            Страница <span className="text-accent">{pathname}</span> не найдена
          </p>
          <p className={styles.description}>
            Вы будете перенаправлены на главную страницу через
            <strong className="text-accent"> {countdown} сек.</strong>
          </p>
        </div>
      </div>
      <Link href="/">
        <Button variant="Primary" size="Large">
          На главную
        </Button>
      </Link>
    </div>
  );
};
