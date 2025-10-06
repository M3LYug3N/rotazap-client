"use client";

import Link from "next/link";

import { userMenuItems } from "@/components/ui/user/userMenuItems";

import { useCurrentPath } from "@/hooks/useCurrentPath";

import styles from "@/styles/components/ui/user/User.module.css";

export const UserSidebarMenu = () => {
  const pathname = useCurrentPath();
  const visibleItems = userMenuItems.filter(item => item.render !== false);

  return (
    <ul className="h-full">
      <aside className={styles.sidebar}>
        {visibleItems.map(item => (
          <li key={item.id}>
            <Link
              className={`${styles.linkSidebar} rounded-md ${
                item.disabled ? styles.disabledLink : ""
              } ${pathname === item.href ? styles.activeLink : ""}`}
              href={item.href}
              aria-disabled={item.disabled}
              onClick={e => item.disabled && e.preventDefault()}
            >
              <item.icon fontSize="medium" />
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </aside>
    </ul>
  );
};
