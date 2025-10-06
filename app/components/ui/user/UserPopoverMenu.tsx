"use client";

import Link from "next/link";

import { userMenuItems } from "@/components/ui/user/userMenuItems";

import { useCurrentPath } from "@/hooks/useCurrentPath";

import styles from "@/styles/components/ui/user/User.module.css";

interface Props {
  onClose: () => void;
  filterIds?: number[];
}

export const UserPopoverMenu = ({ onClose, filterIds }: Props) => {
  const pathname = useCurrentPath();
  const filteredItems = (
    filterIds
      ? userMenuItems.filter(item => filterIds.includes(item.id))
      : userMenuItems
  ).filter(item => item.render !== false); // <- ФИЛЬТРУЕМ ПО render

  const handleItemClick = () => {
    onClose();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <aside>
      {filteredItems.map(item => (
        <li key={item.id} onClick={handleItemClick}>
          {item.disabled ? (
            <div
              className={`${styles.link} ${styles.disabledLink} rounded-md`}
              aria-disabled="true"
            >
              <item.icon fontSize="medium" />
              <p>{item.title}</p>
            </div>
          ) : (
            <Link
              className={`${styles.link} rounded-md ${
                pathname === item.href ? styles.activeLink : ""
              }`}
              href={item.href}
            >
              <item.icon fontSize="medium" />
              <p>{item.title}</p>
            </Link>
          )}
        </li>
      ))}
    </aside>
  );
};
