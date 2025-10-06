"use client";

import { useAuthStore } from "@/store/useAuthStore";

import styles from "@/styles/components/ui/user/User.module.css";

export const UserInfo = () => {
  const { user, isAuthReady } = useAuthStore();

  if (!isAuthReady) {
    return (
      <li className={styles.userInfo}>
        <p className={styles.title}>Загрузка...</p>
      </li>
    );
  }

  if (!user) return null;

  return (
    <li className={styles.userInfo}>
      <p className={styles.title}>{user.username}</p>
      <p className={styles.subtitle}>{user.email}</p>
    </li>
  );
};
