import { HeaderBasket } from "@/components/layout/header/HeaderBasket";
import { HeaderUserMenu } from "@/components/layout/header/HeaderUserMenu";
import { CurrencyRates } from "@/components/ui/currency-rates/CurrencyRates";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderBottom = () => (
  <div className={styles.headerBottom}>
    <div className={`container ${styles.headerContainer}`}>
      <div className={styles.headerBottomContainer}>
        <CurrencyRates />
        <HeaderBasket />
        <HeaderUserMenu />
      </div>
    </div>
  </div>
);
