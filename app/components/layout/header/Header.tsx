"use client";

import { Skeleton } from "@mui/material";

import { HeaderBottom } from "@/components/layout/header/HeaderBottom";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/components/layout/header/Header.module.css";

export const Header = () => {
  const isAuthenticated = useAuthStore(
    state => !!state.user && state.user.role === "user"
  );
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  return (
    <header className={styles.header}>
      <HeaderTop />

      {!isAuthReady ? (
        <div className={styles.headerBottom}>
          <div className={`container ${styles.headerContainer}`}>
            <div className={styles.headerBottomContainer}>
              <Skeleton variant="rounded" width={280} height={60} />
              <Skeleton variant="rounded" width={320} height={60} />
              <Skeleton variant="rounded" width={240} height={60} />
            </div>
          </div>
        </div>
      ) : isAuthenticated ? (
        <HeaderBottom />
      ) : null}
    </header>
  );
};
