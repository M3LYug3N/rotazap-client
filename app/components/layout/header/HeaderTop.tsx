import { HeaderLogo } from "@/components/layout/header/HeaderLogo";
import { DrawerComponent } from "@/components/ui/drawer/DrawerComponent";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderTop = () => (
  <div className={styles.headerTop}>
    <div className="flex h-full items-center">
      <DrawerComponent />
    </div>
    <div className={`container ${styles.headerContainer}`}>
      <HeaderLogo />
    </div>
  </div>
);
