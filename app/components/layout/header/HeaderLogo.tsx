import Link from "next/link";

import { IconLogo } from "@/components/icons/IconLogo";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderLogo = () => (
  <Link href="/" className={styles.logoContainer}>
    <IconLogo />
    <h1 className={styles.logoTitle}>
      Интернет-магазин <br /> автомобильных запчастей <br />
      <span className="hidden">Rotazap</span>
    </h1>
  </Link>
);
